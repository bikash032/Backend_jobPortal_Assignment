'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JobDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jobTitle: {
        type: Sequelize.STRING
      },
      jobDesrciption: {
        type: Sequelize.STRING
      },
      jobLocation: {
        type: Sequelize.STRING
      },
      jobType: {
        type: Sequelize.STRING
      },
      jobCategory: {
        type: Sequelize.STRING
      },
      jobSalary: {
        type: Sequelize.NUMBER
      },
      jobRequirements: {
        type: Sequelize.STRING
      },
      jobResponsibilities: {
        type: Sequelize.STRING
      },
      jobBenefits: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JobDetails');
  }
};