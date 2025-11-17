const userSvc = require("./user.service");

class UserController {
  listUsers = async(req, res, next) => {
    try {
      let filter = {
        _id: { $ne: req.loggedInUser._id},
      };

      if(req.query.role) {
        filter = {
          ...filter, 
          role: req.query.role.toLowerCase()
        }
      }

      let limit = +req.query.limit || 10;
      let currentPage = +req.query.page || 1;

      // limit
      // currentpage

      let { data, pagination } = await userSvc.getAllByFilter(
        filter,
        currentPage,
        limit,
        req.query.sort
      );

      res.json({
        data: data,
        message: "List all successfully",
        status: "LISTING_SUCCESS",
        options: {
          pagination,
        },
      });
    } catch(exception) {
      next(exception)
    }
  }
}

const userCtrl = new UserController();
module.exports = userCtrl;
