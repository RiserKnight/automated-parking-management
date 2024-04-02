'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('APIEntries', {
      entryID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID:{
        allowNull: false,
        type: Sequelize.INTEGER,
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
      type: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'Entry must have a type'},
          notEmpty:{msg:'Type must not be empty'}
        }
      },
      lotCode: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'Entry must have a lot'},
          notEmpty:{msg:'Lot must not be empty'}
        }
      },
      time: {
        type: DataTypes.BIGINT,
        allowNull:false,
        validate:{
          notNull:{msg:'Entry must have a valid time'},
          notEmpty:{msg:'Valid Time must not be empty'}
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
    await queryInterface.dropTable('APIEntries');
  }
};