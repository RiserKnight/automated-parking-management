'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
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
    }
  }, 
  {
    hooks: {
      beforeCreate: async(user, options) => {

        const salt = await bcrypt.genSalt(10);
        user.pass  = await bcrypt.hash(user.pass, salt);
     
      }
    },
    //freezeTableName: true,
    indexes: [
      {
        name: "regNo_trigram",
        concurrently: true,
        using: "GIN",
        fields: [sequelize.literal("regNo gin_trgm_ops")],
      },
    ],
    sequelize,
    modelName: 'user',
  }

);
  return user;
};