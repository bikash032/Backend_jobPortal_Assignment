const router = require("express").Router();
const authRouter = require("../modules/auth/auth.router");
const jobDetailsRouter = require("../modules/jobDetails/jobDetails.router");


router.use('/auth',authRouter);
router.use('/auth', jobDetailsRouter);



module.exports = router