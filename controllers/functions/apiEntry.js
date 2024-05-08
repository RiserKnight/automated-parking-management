
const filterFunct = require("./filter.js");
const regNoFunct = require("./regNoSearch.js");
const dueFunct = require("./dueCalculator.js");
const {APIEntry,user}=require('../../models')

exports.apiEntry=async(Number,req)=>{
    let due=0;
    let regNo=filterFunct.filter(Number);
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
      await user.update({due},{where:{userID}});
      await APIEntry.destroy({where:{entryID}});
      userC['due']=due;
    }
    return userC;
    }