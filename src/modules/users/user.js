const { DataTypes } = require("sequelize");
const sequelize = require("../../config/pg.config")

const UserModels = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  role: {
    type: DataTypes.ENUM,
    values: ["admin", "company", "jobSeeker"],
    allowNull: false,
    defaultValue: "jobSeeker",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  activationToken: {
    type: DataTypes.STRING,
    allowNull: true,    
    defaultValue: null,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["active", "inactive"],
    allowNull: true,
    defaultValue: "inactive",
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Date.now(),
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Date.now(),
  },
});

module.exports = UserModels