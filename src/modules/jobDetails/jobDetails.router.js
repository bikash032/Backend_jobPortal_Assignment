const { UserRole } = require('../../config/constant');
const { loginCheck, checkPermission } = require('../../middlewares/auth.middleware');
// const { uploader } = require('../../middlewares/multipart-formdata.middleware');
const { bodyValidator } = require('../../middlewares/request-validator.middleware');
const jobDetailsCtrl = require('./jobDetails.controller');
const { JobDetailsCreateDTO } = require('./jobDetails.validator');
// const { JobDetailsUpdateDTO, JobDetailsCreateDTO } = require('./jobDetails.validator');

const jobDetailsRouter = require('express').Router()

jobDetailsRouter.get('/front', jobDetailsCtrl.lisAllForHome)


jobDetailsRouter.post('/createJob',  bodyValidator(JobDetailsCreateDTO), jobDetailsCtrl.createjobDetails)
// jobDetailsRouter.get('/', loginCheck, checkPermission([UserRole.ADMIN]), jobDetailsCtrl.listAllData)

// // find 
jobDetailsRouter.get('/:id', jobDetailsCtrl.getById)
// jobDetailsRouter.put('/:id', loginCheck, checkPermission([UserRole.ADMIN]), uploader().single('image'), bodyValidator(JobDetailsUpdateDTO), jobDetailsCtrl.updatejobDetails)
jobDetailsRouter.delete('/:id',jobDetailsCtrl.deleteById)

module.exports = jobDetailsRouter;