
const filterFunct = require("./filter.js");
const regNoFunct = require("./regNoSearch.js");
const dueFunct = require("./dueCalculator.js");
const {APIEntry,user,ParkingHistory,srgmLot}=require('../../models')

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
      lotEntry= await srgmLot.findOne({where:{occupy:false}});
      const slotID=lotEntry.dataValues.slotID;
      srgmLot.update({regNo,occupy:true},{where:{slotID}});
      console.log(slotID);

      const entry=await APIEntry.create({userID,regNo,type,lotCode,time});
      console.log(entry.dataValues);
    }
    else if (type=="exit")
    {
      const entry = await APIEntry.findOne({where: {regNo: regNo, type: 'entry' },order: [['time', 'ASC']] });

      entryID=entry.dataValues.entryID;
      console.log(entry.dataValues);
      due=dueFunct.calcDue(lotCode,entry.dataValues.time,time);
      dueN=parseInt(due)+parseFloat(userC.due);

      await user.update({due:dueN},{where:{userID}});
      await APIEntry.destroy({where:{entryID}});
      userC['due']=dueN;

      lotEntry= await srgmLot.findOne({where:{regNo,occupy:true}});
      const slotID=lotEntry.dataValues.slotID;
      srgmLot.update({regNo:"",occupy:false},{where:{slotID}});

      let lotName="";
      if(lotCode=="srgm")lotName="Srirangam Parking Lot";
      else if(lotCode=="skkn")lotName="SKK Nagar Parking Lot";
      else if(lotCode=="pjr")lotName="Panjapur Parking Lot";
      else if(lotCode=="thln")lotName="Thillai Nagar";
      const entryT =new Date(parseInt(entry.dataValues.time));
      const exitT =new Date(time);
      const entryTime=entryT.toLocaleString();
      const exitTime=exitT.toLocaleString();
      due=parseInt(due);
      await ParkingHistory.create({userID,regNo,lotName,entryTime,exitTime,due});
    }
    return userC;
    }