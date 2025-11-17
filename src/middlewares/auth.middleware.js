const jwt = require("jsonwebtoken");
const { AppConfig, UserRole } = require("../config/constant");
const authSvc = require("../modules/auth/auth.service");

const loginCheck = async (req, res, next) => {
  try {

    let token = req.headers["authorization"] || null;
console.log(token);

    if (!token) {
      next({
        code: 401,
        message: "Please login first",
        status: "TOKEN_EXPECTED",
      })
    } else {
      // token
      // token = token.replace("Bearer ", '')
      token = token.split(" ").pop();

      // verify
      const data = jwt.verify(token, AppConfig.jwtSecret); // decode

      const user = await authSvc.getSingleUserByFilter({
        _id: data.sub,
      });

      if (!user) {
        next({
          message: "User does not exists",
          code: 401,
          status: "USER_NOT_FOUND",
        });
      } else {
        console.log("Logged in user",user);
        
        req.loggedInUser = authSvc.mapLoggedInUser(user);
        next();
      }
    }
  } catch (exception) {
    // obj    
    // next(exception)
    if (exception instanceof jwt.JsonWebTokenError) {
      let status = "";
      if (exception.message === "invalid token") {
        status = "MALFORMED_HEADER_JWT";
      } else if (exception.message === "invalid signature") {
        status = "MALFORMED_SIGNATURE_JWT";
      } else if (exception.message === "jwt expired") {
        status = "JWT_EXPIRED"
      }
        next({
          message: exception.message,
          code: 401,
          status: status, //
        });
    } else {
      next({
        detail: exception.message,
        message: "Invalid token",
        code: 401,
        status: "PAYLOAD_NOT_VERIFIED",
      });
    }
  }
};


//allow
const checkPermission = (role) => {
  // role => ['admin','seller'], ['admin']
  return (req, res, next) => {
    let loggedInUser = req.loggedInUser;
    // bypass 
    if(loggedInUser.role === "company" ||loggedInUser.role==="jobSeeker"|| (role.includes(loggedInUser.role))) {
      next()
    } else if(role.includes(loggedInUser.role)) {
      next()
    } else {
      next({
        message: "Access Denied",
        code: 403,
        status: "PERMISSION_DENIED"
      })
    }
  }
}
module.exports = {
  loginCheck,
  checkPermission,
};
