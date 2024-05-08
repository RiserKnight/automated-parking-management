'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class thlnLot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  thlnLot.init({
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
    }
  }, {
    sequelize,
    modelName: 'thlnLot',
  });
  return thlnLot;
};