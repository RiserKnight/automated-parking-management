'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ParkingHistories', {
      parkingID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userID:{
        allowNull: false,
        type: DataTypes.INTEGER,
        validate:{
          notNull:{msg:'User must have a ID'},
          notEmpty:{msg:'ID must not be empty'}
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
      lotName: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'Entry must have a lot'},
          notEmpty:{msg:'Lot must not be empty'}
        }
      },
      entryTime: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'Entry must have a entryTime'},
          notEmpty:{msg:'entryTime must not be empty'}
        }
      },
      exitTime: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'Entry must have a exitTime'},
          notEmpty:{msg:'exitTime must not be empty'}
        }
      },
      due: {
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0,
        validate:{
          notNull:{msg:'Entry must have a due'},
          notEmpty:{msg:'Due must not be empty'}
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
    await queryInterface.dropTable('ParkingHistories');
  }
};