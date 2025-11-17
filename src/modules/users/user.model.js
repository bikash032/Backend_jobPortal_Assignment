// const mongoose = require("mongoose");
// const { StatusSchema } = require("../../config/common.schema");

// const UserSchema = new mongoose.Schema({
//   // name string(50)
//   name: {
//     type: String,
//     min: 2,
//     max: 50,
//     required: true
//   },
//   // email string unique
//   email: {
//     type: String, 
//     required: true, 
//     unique: true
//   },
//   // password string 
//   password: {
//     type: String, 
//     required: true,
//   },
//   // role UserRole [default: "customer"]
//   role: {
//     type: String, 
//     enum: ["admin",'employer','jobSeeker'],
//     default: "jobSeeker"
//   },
//   // activationToken string(100)
//   activationToken: String, 
//   // forgetPasswordToken string(100)
//   forgetPasswordToken: String, 
//   // expiryTime datetime
//   expiryTime: Date,
//   // status Status [default: 'inactive']
//   status:{ ...StatusSchema }
// }, {
//   autoCreate: true, 
//   autoIndex: true,
//   timestamps: true    // createdAt, updatedAt
// })

// const UserModel = mongoose.model("User", UserSchema)

// module.exports = UserModel;