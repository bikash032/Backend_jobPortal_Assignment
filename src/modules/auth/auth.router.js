// express middleware, routing 
const authRouter = require("express").Router();
const authCtrl = require("./auth.controller");
const {bodyValidator} = require("../../middlewares/request-validator.middleware");
const {UserRegistrationDTO, UserLoginDTO, ForgetPasswordDTO, ResetPasswordDTO, ChangePasswordDTO} = require("./auth.validator");
const {uploader} = require("../../middlewares/multipart-formdata.middleware");
const { loginCheck, checkPermission } = require("../../middlewares/auth.middleware");

// payload -> validate -> db query -> mail -> client response
authRouter.post('/register', authCtrl.register)
authRouter.get("/activate/:token", authCtrl.userActivate);

authRouter.post('/login',bodyValidator(UserLoginDTO), authCtrl.login)

authRouter.get("/me", loginCheck, authCtrl.getLoggedInUser);
authRouter.post('/forget-password',bodyValidator(ForgetPasswordDTO), authCtrl.forgetPassword)
authRouter.get("/verify-forget-token/:token", authCtrl.verifyForgetPasswordToken);
authRouter.post('/reset-password',bodyValidator(ResetPasswordDTO), authCtrl.resetPassword)
authRouter.post("/change-password", loginCheck, bodyValidator(ChangePasswordDTO), authCtrl.updatePasswordForLoggedInUser );
authRouter.get("/refresh", authCtrl.refreshToken)
// token refresh
// 

authRouter.get('/user-profile/:id', authCtrl.getUserProfile)


module.exports = authRouter;


