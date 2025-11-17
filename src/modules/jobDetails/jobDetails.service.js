const { Op } = require("sequelize");
const cloudinarySvc = require("../../services/cloudinary.service");
const JobDetailsModel = require("./jobdetails");

class JobDetailsService {
  transformjobDetailsCreate = async (req) => {
    try {
      let data = req.body;
      console.log("hello from the job details service",data);
      
      return data;
    } catch (exception) {
      throw exception;
    }
  };

  transformJobDetailsUpdate = async (req, oldData) => {
    try {
      let data = req.body;

      if (req.file) {
        data.image = await cloudinarySvc.uploadFile(req.file.path, "JobDetails");
      } else {
        data.image = oldData.image;
      }

      return data;
    } catch (exception) {
      throw exception;
    }
  };

  storejobDetails = async (data) => {
    try {
      console.log(data);
      
      const JobDetails = await JobDetailsModel.create(data);
      return JobDetails;
    } catch (exception) {
      throw exception;
    }
  };

  getAllData = async (query, filter = {}) => {
    try {
      let page = +query.page || 1;
      let limit = +query.limit || 10;
      let skip = (page - 1) * limit;

      // SELECT id,title,status FROM TABLE WHERE clause ORDER BY SKIP 0 LIMIT10
      // SELECT * FROM JobDetailss where title ilike '%one%'
      const { rows, count } = await JobDetailsModel.findAndCountAll({
        // attributes: ['id','title']
        where: filter,
        offset: skip,
        limit: limit,
        order: [["id", "desc"]],
      });
      return {
        data: rows,
        pagination: {
          limit: limit,
          page: page,
          total: count,
        },
      };
    } catch (exception) {
      throw exception;
    }
  };

  getSingleRowById = async (id) => {
    try {
      let data = await JobDetailsModel.findByPk(id);
      return data;
    } catch (exception) {
      throw exception;
    }
  };

  updateByFilter = async (filter, update) => {
    try {
      console.log(filter);
      const updateData = await JobDetailsModel.update(update, {
        where: filter,
        returning: [
          "id",
          "title",
          "url",
          "status",
          "image",
          "createdAt",
          "updatedAt",
        ],
      });
      return updateData[1][0];
    } catch (exception) {
      throw exception;
    }
  };
  deleteById = async (id) => {
    try {
      const data = await JobDetailsModel.destroy({
        where: { id: id }
      })
      return data;
    } catch (exception) {
      throw exception
    }
  }
}

const JobDetailsSvc = new JobDetailsService()

module.exports = JobDetailsSvc