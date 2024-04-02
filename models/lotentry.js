'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lotEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  lotEntry.init({
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
    }
  }, {
    sequelize,
    modelName: 'lotEntry',
  });
  return lotEntry;
};