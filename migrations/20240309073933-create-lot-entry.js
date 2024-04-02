'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lotEntries', {
      lotEntryID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lotCode: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'Entry must have a lot'},
          notEmpty:{msg:'Lot must not be empty'}
        }
      },
      regNo: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'Entry must have a regNo'},
          notEmpty:{msg:'regNo must not be empty'}
        }
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
    await queryInterface.dropTable('lotEntries');
  }
};