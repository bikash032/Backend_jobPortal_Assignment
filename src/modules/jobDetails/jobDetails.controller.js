const { Op } = require("sequelize");
const jobDetailsSvc = require("./jobDetails.service")

class jobDetailsController {
  createjobDetails = async (req, res, next) => {
    try {
      const payload = await jobDetailsSvc.transformjobDetailsCreate(req);
      console.log("Payload from the data",payload);
      
      const jobDetails = await jobDetailsSvc.storejobDetails(payload);

      res.json({
        data: jobDetails,
        message: "jobDetails Created",
        status: "jobDetails_CREATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllData = async (req, res, next) => {
    try {
      let filter = {};
      if (req.query.search) {
        filter = {
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        };
      }
      let { data, pagination } = await jobDetailsSvc.getAllData(req.query, filter);
      res.json({
        data: data,
        message: "List all data",
        status: "OK",
        options: pagination,
      });
    } catch (exception) {
      next(exception);
    }
  };

  lisAllForHome = async (req, res, next) => {
    try {
      let filter = {
        status: "active"
      };
      if (req.query.search) {
        filter = {
          ...filter,
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        };
      }
      let { data, pagination } = await jobDetailsSvc.getAllData(req.query, filter);
      res.json({
        data: data,
        message: "List all data",
        status: "OK",
        options: pagination,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getById = async (req, res, next) => {
    try {
      let id = req.params.id;
      console.log("Hello for the ID value",id);
      
      const data = await jobDetailsSvc.getSingleRowById(id);
      if (!data) {
        throw {
          code: 422,
          message: "jobDetails not found",
          status: "jobDetails_NOT_FOUND",
        };
      }
      res.json({
        data: data,
        message: "jobDetails Detail",
        status: "jobDetails_DETAIL",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updatejobDetails = async (req, res, next) => {
    try {
      let id = req.params.id;
      const data = await jobDetailsSvc.getSingleRowById(id);
      if (!data) {
        throw {
          code: 422,
          message: "jobDetails not found",
          status: "jobDetails_NOT_FOUND",
        };
      }
      //
      const payload = await jobDetailsSvc.transformjobDetailsUpdate(req, data);
      const update = await jobDetailsSvc.updateByFilter(
        {
          id: id,
        },
        payload
      );
      res.json({
        data: update,
        message: "jobDetails Updated",
        status: "jobDetails_UPDATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteById = async (req, res, next) => {
    try {
      let id = req.params.id;
      const data = await jobDetailsSvc.getSingleRowById(id);
      if (!data) {
        throw {
          code: 422,
          message: "jobDetails not found",
          status: "jobDetails_NOT_FOUND",
        };
      }
      let response = await jobDetailsSvc.deleteById(id);
      res.json({
        data: response,
        message: "jobDetails Deleted",
        status: "jobDetails_DELETED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const jobDetailsCtrl = new jobDetailsController()
module.exports = jobDetailsCtrl