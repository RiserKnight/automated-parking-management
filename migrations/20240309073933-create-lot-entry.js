'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('lotEntries', {
      lotEntryID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('lotEntries');
  }
};