const UserModel = require("./user.model");

class UserService {
  getAllByFilter = async (filter = {}, page = 1, limit = 10, sort = "") => {
    try {
      let sortKey = { title: "asc" };

      if (sort) {
        let [key, dir] = sort.split("_");
        sortKey = {
          [key]: dir,
        };
      }

      let skip = (page - 1) * limit;
      let data = await UserModel.find(filter, { password: 0, activationToken: 0})
        .sort(sortKey)
        .skip(skip)
        .limit(limit);

      let totalRow = await UserModel.countDocuments(filter);

      return {
        data,
        pagination: {
          limit: limit,
          page: page,
          total: totalRow,
        },
      };
    } catch (exception) {
      throw exception;
      // throw new Error()
    }
  };
}

const userSvc = new UserService()

module.exports = userSvc