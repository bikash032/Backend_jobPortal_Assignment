const express = require("express");
const router = require("./router.config");
const { SequelizeScopeError } = require("sequelize")
// const Mongoose = require("mongoose");
const cors = require("cors")
// require("./db.config");
require("./pg.config")


const app = express() // 
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// express application 

// parser body
// json content 
app.use(express.json())
// urlencoded 
app.use(express.urlencoded({
  extended: false
}))

// Health URL
app.use('/health', (request, response, next) => {
  response.json({
    data: null,
    message: "Health Ok",
    status: "OK",
    options: null
  })
})


/** global Router */
app.use('/api/v1', router);



// non existing routes 
app.use((req, res, next) => {
  next({ code: 404, message: "Not found", status: "NOT_FOUND" })
})

/** Error handling Middleware configure */
app.use((error, req, res, next) => {
  // garbage collector 
  console.log("Garbage Collector: ", error)

  let statusCode = error.code || 500;
  let detail = error.detail || null;
  let msg = error.message || 'Internal Server Error...';
  let status = error.status || "SERVER_ERROR"
  if (
    error instanceof SequelizeScopeError ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    detail = null;
    const duplicateField = error.errors[0].path; // Column name (e.g., 'email')
    const duplicateValue = error.errors[0].value; // Duplicate value (e.g., 'bikash1234@gamil.com')
    msg = `${duplicateField}:${duplicateValue} is already exist in database`;
    status = "VALIDIATION_FAILED";
    // }
    // if (error instanceof Mongoose.Error || error.name === 'MongoServerError') {
    //   if (error.code === 11000) {
    //     statusCode = 400;
    //     let key = Object.keys(error.keyPattern).pop();
    //     detail = {
    //       [key]: `${key} should be unique`,
    //     };
    //     msg = "Validation failed";
    //     status = "VALIDATION_FAILED";
    //   }
  }


  res.status(statusCode).json({
    error: detail,
    message: msg,
    status: status,
    options: null
  })
})
module.exports = app;