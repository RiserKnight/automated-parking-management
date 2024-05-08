const {user}=require('../../models')

const sequelize = require('sequelize');
exports.findClosestVehicleNumber=async(testVehicleNumber)=>{
    let users=[];
    try {
      users=await user.findAll({
        attributes: {
          include: [[sequelize.fn("similarity",sequelize.col("regNo"),testVehicleNumber),"score",]],
        },
        order: [[sequelize.literal('"score" DESC')]],
        limit: 1
      })

    } catch (error) {
      console.error('Error finding closest vehicle number:', error);
    }

    return users[0].dataValues;
    }