
const fs = require('fs');
const filterFunct = require("./functions/filter.js");
const regNoFunct = require("./functions/regNoSearch.js");
const dueFunct = require("./functions/dueCalculator.js");
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const {APIEntry,user}=require('../models')

function imageToBase64(imagePath) {
    // Read the image file as a buffer
    const imageBuffer = fs.readFileSync(imagePath);

    // Convert the buffer to a base64 string
    const base64String = imageBuffer.toString('base64');

    return base64String;
}

module.exports.home = (req, res) => {

    try {
      res.locals.user =req.user;
    res.render("home");
      
    } catch (error) {
      console.log(error);
    }
  }
  
  module.exports.cameraAPI = (req, res) => {

    try {
      res.locals.user =req.user;
    res.render("imageUp");
      
    } catch (error) {
      console.log(error);
    }
  }

  module.exports.Vno=async(req, res) => {
  try {
    res.locals.user =req.user;
    const fileName="./uploads/"+req.files.postFile[0].filename;
   
    const base64String = imageToBase64(fileName);

    const result = await fetch('http://127.0.0.1:8000/node_call', { 
      method: 'POST', 
      body: JSON.stringify({"data":base64String}),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await result.json();
    let due=0;
    let regNo=filterFunct.filter(data.Number);
    const lotCode=req.body.lots;
    const type=req.body.entryType;
    let userC=await regNoFunct.findClosestVehicleNumber(regNo);
    const userID=userC.userID;
    regNo =userC.regNo;
    const d = new Date();
    const time = d.getTime();
    console.log(userC);
    if(type=="entry")
    {
      const entry=await APIEntry.create({userID,regNo,type,lotCode,time});
      console.log(entry.dataValues);
    }
    else if (type=="exit")
    {
      const entry = await APIEntry.findOne({where: {regNo: regNo, type: 'entry' },order: [['time', 'ASC']] });
      entryID=entry.dataValues.entryID;
      console.log(entry.dataValues);
      due=dueFunct.calcDue(lotCode,entry.dataValues.time,time);
      due=parseInt(due)+parseFloat(userC.due);
      userC=await user.update({due},{where:{userID}});
      await APIEntry.destroy({where:{entryID}});
      console.log(due);
    }
    res.send(data);

  } catch (error) {
    console.log(error);
  }
}