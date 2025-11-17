require("dotenv").config();
const authSvc = require('./auth.service');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { generateRandomString } = require("../../utils/helpers");
const { DateTime } = require("luxon");
const { StatusValue, AppConfig } = require("../../config/constant");

class AuthController {
  register = async (req, res, next) => {
    try {
      let data = await authSvc.registerTransform(req);
      
      const userObj = await authSvc.createUser(data);
      console.log("data after transform", userObj);

      await authSvc.activateNotify({
        name: userObj.name,
        email: userObj.email,
        token: userObj.activationToken,
      });

      res.json({
        data: authSvc.mapLoggedInUser(userObj),
        message: "Please check your email to activate your account",
        status: "OK",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userExists = await authSvc.getSingleUserByFilter({
        email: email,
      });

      if (!userExists) {
        throw {
          code: 422,
          message: "User Does not exists",
          status: "USER_NOT_FOUND",
        };
      }

      // password
      if (!bcrypt.compareSync(password, userExists.password)) {
        throw {
          code: 422,
          message: "Credentials does not match",
          status: "CREDENTIAL_DOES_NOT_MATCH",
        };
      }

      // active
      if (
        userExists.activationToken !== null ||
        userExists.status === "inactive"
      ) {
        throw {
          code: 422,
          message: "User not activated",
          status: "USER_NOT_ACTIVATED_YET",
        };
      }

      // token, access token, data pass => JWT token
      //
      let accessToken = jwt.sign(
        {
          sub: userExists._id,
        },
        AppConfig.jwtSecret,
        {
          expiresIn: 3 * 60 * 60,
        }
      );
      res.json({
        data: {
          token: accessToken,
        },
        message: "Logged in successfully",
        status: "OK",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  userActivate = async (req, res, next) => {
    try {
      const { token } = req.params; // {token: ""} => ""
      const user = await authSvc.getSingleUserByFilter({
        activationToken: token,
      });
      console.log("user at activate", user);
      if (!user) {
        throw {
          code: 422,
          message: "User not found or token already used or activated",
          status: "VALIDATION_FAILED",
        };
      }      
      const updateUser = await authSvc.updateUserById(user.id, {        
        activationToken: null,
        status: "active",
      });
      console.log("updated user at controller", updateUser);
        
      res.json({
        data: {
          id: updateUser.id,
          name: updateUser.name,
          email: updateUser.email,
          role: updateUser.role,
          status: updateUser.status,
        },                
        message: "Your account has been activated successfully",
        status: "OK",
        options: null,
      });
      // activationToken: "", status: "inactive"
    } catch (exception) {
      next(exception);
    }
  };

  getLoggedInUser = async (req, res, next) => {
    console.log("logged in user at controller",req.loggedInUser);
    
    res.json({
      data: req.loggedInUser,
      message: "Your profile",
      status: "OK",
      options: null,
    });
  };

  forgetPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await authSvc.getSingleUserByFilter({
        email: email,
      });

      if (!user) {
        throw {
          code: 422,
          message: "User not found",
          status: "USER_NOT_FOUND",
        };
      }

      //
      let token = generateRandomString(100);
      let expiryTime = DateTime.now()
        .plus({ hour: 1 })
        .toFormat("yyyy-MM-dd HH:mm:ss");

      // user update
      await authSvc.updateUserById(user._id, {
        forgetPasswordToken: token,
        expiryTime: expiryTime,
      });

      // notify
      await authSvc.forgetPasswordNotify({
        email: user.email,
        token: token,
        name: user.name,
      });
      res.json({
        data: null,
        message:
          "Your request has been sent. You might have received an email to reset your password.",
        status: "OK",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  verifyForgetPasswordToken = async (req, res, next) => {
    try {
      const token = req.params.token || null;

      const user = await authSvc.verifyForgetPasswordToken(token);
      //
      const newForgetPasswordToken = generateRandomString(100);
      await authSvc.updateUserById(user._id, {
        forgetPasswordToken: newForgetPasswordToken,
        expirtyTime: DateTime.now()
          .plus({ hour: 1 })
          .toFormat("yyyy-MM-dd HH:ii:ss"),
      });

      res.json({
        data: newForgetPasswordToken,
        status: "TOKEN_VERIFIED",
        message: "Forget Password Token verified",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const { token, password } = req.body;
      const user = await authSvc.verifyForgetPasswordToken(token);

      await authSvc.updateUserById(user._id, {
        password: bcrypt.hashSync(password, 10),
        forgetPasswordToken: null,
        activationToken: null,
        expiryTime: null,
        status: StatusValue.ACTIVE,
      });
      res.json({
        data: null,
        message:
          "Your password has been changed successfully. Please login to continue.",
        status: "PASSWORD_UPDATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updatePasswordForLoggedInUser = async (req, res, next) => {
    try {
      const { oldPassword, newPassword } = req.body;
      if (oldPassword === newPassword) {
        throw {
          code: 400,
          message: "Old password Cannot use as new password",
          status: "VALIDATION_FAILED",
          detail: {
            newPassword: "Old password Cannot use as new password",
          },
        };
      }
      const loggedInUser = await authSvc.getSingleUserByFilter({
        _id: req.loggedInUser._id
      })

      if (!bcrypt.compareSync(oldPassword, loggedInUser.password)) {
        throw {
          code: 400,
          message: "Old password does not match",
          status: "VALIDATION_FAILED",
          detail: {
            oldPassword: "Old password does not match"
          }
        };
      }

      await authSvc.updateUserById(loggedInUser._id, {
        password: bcrypt.hashSync(newPassword, 10)
      })

      res.json({
        data: null,
        message: "Your password has been changed Successfully.",
        status: "PASSWORD_UPDATED_SUCCESSFULLY",
        options: null
      })
    } catch (exception) {
      next(exception)
    }
  }

  getUserProfile = (req, res, next) => { };

  updateUserProfile = (req, res, next) => { };

  refreshToken = async (req, res, next) => {
    try {
      let token = req.headers['refresh'] || null;
      if (!token) {
        throw {
          code: 401,
          message: "Token expected",
          status: "EMPTY_TOKEN"
        }
      }
      token = token.split(' ').pop()
      // jwt.verify
      const data = jwt.decode(token, {
        complete: true,
        // json: true
      })
      // header, payload, signatue 
      // TODO: verify Signature 

      const access_token = jwt.sign(
        {
          sub: data.payload.sub,
        },
        AppConfig.jwtSecret,
        {
          expiresIn: "3hr"
        }
      );
      res.json({
        data: access_token,
        message: "Token Refresh",
        status: "REFRESH_TOKEN",
        options: null
      })
    } catch (exception) {
      next(exception)
    }
  }
}

const authCtrl = new AuthController()
module.exports = authCtrl;