const { DataTypes } = require("sequelize");
const sequelize = require("../../config/pg.config");

const JobDetailsModel = sequelize.define("JobDetails", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // UUID primary key
    primaryKey: true,
    allowNull: false,
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobDesrciption: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  jobLocation: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  jobType: {
    type: DataTypes.ENUM,
    values: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
    allowNull: true,
    defaultValue: null,
  },
  jobCategory: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  jobSalary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: null,
  },
  jobRequirements: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  jobResponsibilities: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  jobBenefits: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Date.now(), // sets timestamp on creation
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Date.now(), // sets timestamp on update
  },
});

module.exports = JobDetailsModel;
