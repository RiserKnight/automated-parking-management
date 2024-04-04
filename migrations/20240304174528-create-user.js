'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      userID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'User must have a name'},
          notEmpty:{msg:'name must not be empty'}
        }
      },
      regNo: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'User must have a regNo'},
          notEmpty:{msg:'regNo must not be empty'}
        }
      },
      contact: {
        type: DataTypes.BIGINT,
        allowNull:false,
        validate:{
          notNull:{msg:'User must have a contact'},
          notEmpty:{msg:'Contact Time must not be empty'}
        }
      },
      email: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'User must have a email'},
          notEmpty:{msg:'Email must not be empty'}
        }
      },
      due: {
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0,
        validate:{
          notNull:{msg:'User must have a due'},
          notEmpty:{msg:'Due must not be empty'}
        }
      },
      pass: {
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
          notNull:{msg:'User must have a Password'},
          notEmpty:{msg:'Password must not be empty'}
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
    await queryInterface.dropTable('users');
  }
};