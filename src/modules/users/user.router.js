const { UserRole } = require("../../config/constant");
const { loginCheck, checkPermission } = require("../../middlewares/auth.middleware");
const userCtrl = require("./user.controller");

const userRouter = require("express").Router();

userRouter.get('/', loginCheck, checkPermission([UserRole.ADMIN]), userCtrl.listUsers)

module.exports = userRouter