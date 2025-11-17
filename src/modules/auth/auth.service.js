require("dotenv").config();
// const cloudinarySvc = require("../../services/cloudinary.service");
const bcrypt = require("bcryptjs");
const { generateRandomString } = require("../../utils/helpers");
// const UserModel = require("../users/user.model");
const mailSvc = require("../../services/mail.service");
const UserModels = require("../users/user");

class AuthService {
  registerTransform = async (req) => {
    try {
      let data = req.body; // object data
      console.log("Data for the register of data",data);
      
      // let file = await cloudinarySvc.uploadFile(req.file.path, "users");
      // log("file data", file);
      data.password = bcrypt.hashSync(data.password, 10);
      data.status = "inactive";
      data.activationToken = generateRandomString();
      delete data.confirmPassword;
      console.log("data for login", data);
      
      // query
      return data;
    } catch (exception) {
      throw exception;
    }
  };

  createUser = async (data) => {
    try {
      console.log("data at service", data);
      const userModelObj = new UserModels(data);
      return await userModelObj.save(); // insert or update
    } catch (exception) {
      throw exception;
    }
  };

  getSingleUserByFilter = async (filter) => {
    try {
      // read
      const user = await UserModels.findOne(filter);
      return user;
    } catch (exception) {
      throw exception;
    }
  };

  updateUserById = async (id, data) => {   // fix parameter order
    console.log("data at update service", data, id);
  
    try {
      const [updatedCount, updatedRows] = await UserModels.update(data, {
        where: { id },
        returning: true, // only works in Postgres
      });
  
      if (updatedCount === 0) {
        console.log("No user updated");
        return null;
      }
  
      const updatedUser = updatedRows[0]; // get the actual updated record
      console.log("updated user at service", updatedUser.dataValues);
  
      return updatedUser; // return the instance
    } catch (exception) {
      throw exception;
    }
  };

  activateNotify = async ({ email, name, token }) => {
    try {
      return await mailSvc.sendEmail({
        to: email,
        subject: "Activate your account.",
        body: `
            <strong>Dear ${name}, </strong><br />
            <p>Your account has been successfully registered.</p>
            <p>Please click the link below to activate your account: </p>
            <a href='${process.env.FRONTEND_URL}activate/?token=${token}'>${process.env.FRONTEND_URL}activate/?token=${token}</a>
            <br />
            <p>Regards,</p>
            <strong>noreply@gmail.com</strong><br />
            <small><em>Please do not reply to this email directly. Incase the link does not execute, copy paste the given url.</em></small>
          `,
      });
    } catch (exception) {
      throw exception;
    }
  };




































































  forgetPasswordNotify = async ({ email, name, token }) => {
    try {
      return await mailSvc.sendEmail({
        to: email,
        subject: "Reset Password Request.",
        body: `
            <strong>Dear ${name}, </strong><br />
            <p>You have requested to reset your password.</p>
            <p>If you have requested this, then click the link below to reset your password, or else ignore this message.</p>
            
            <a href='${process.env.FRONTEND_URL}verify-forget-token/?token=${token}'>${process.env.FRONTEND_URL}verify-forget-token/?token=${token}</a>
            <br />
            <p><strong>Note: </strong>This token is valid only for 1 hour.</p>
            <p>Regards,</p>
            <strong>noreply@gmail.com</strong><br />
            <small><em>Please do not reply to this email directly. Incase the link does not execute, copy paste the given url.</em></small>
          `,
      });
    } catch (exception) {
      throw exception;
    }
  };

  mapLoggedInUser = (user) => {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      address: user.address,
      phone: user.phone,
      gender: user.gender,
      createdAt: user.createdAt,
    };
  };

  verifyForgetPasswordToken = async (token) => {
    if (!token) {
      throw {
        code: 422,
        status: "TOKEN_EXPECTED",
        message: "Forget password token expected",
      };
    }

    const user = await this.getSingleUserByFilter({
      forgetPasswordToken: token,
    });

    if (!user) {
      throw {
        code: 422,
        status: "TOKEN_NOT_FOUND",
        message: "Token does not exists or already expired/deleted.",
      };
    }

    // user exists
    // verify Expiry time
    const tokenExpiryTime = user.expiryTime.getTime(); // in millisecond
    const nowTime = Date.now();

    if (nowTime > tokenExpiryTime) {
      throw {
        code: 422,
        message: "Token Expired",
        status: "FORGET_TOKEN_EXPIRED",
      };
    }
    
    return user;
  };
}

const authSvc = new AuthService();
module.exports = authSvc;
