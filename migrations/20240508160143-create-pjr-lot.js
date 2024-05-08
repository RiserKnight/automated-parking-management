'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('pjrLots', {
      slotID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      floor: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'Slot must have a floor'},
          notEmpty:{msg:'Floormust not be empty'}
        }
      },occupy: {
        type:DataTypes.BOOLEAN,
        allowNull:false,
        validate:{
          notNull:{msg:'Entry must have a regNo'},
          notEmpty:{msg:'regNo must not be empty'}
        }
      },
      regNo: {
        type:DataTypes.STRING,
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
    await queryInterface.dropTable('pjrLots');
  }
};