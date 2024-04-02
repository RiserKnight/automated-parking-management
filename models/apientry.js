'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class APIEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  APIEntry.init({
    entryID: {
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
    }
  }, {
    sequelize,
    modelName: 'APIEntry',
  });
  return APIEntry;
};