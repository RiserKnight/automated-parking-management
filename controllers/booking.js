const {srgmLot,ParkingHistory,skknLot,pjrLot,thlnLot,user,APIEntry}=require('../models')
module.exports.parks = async(req, res) => {

  try {
    res.locals.user =req.user;
    const userID=req.user.userID;
    let parks=[];
    
    const parkingHistory = await ParkingHistory.findAll({ where: { userID} });
    parkingHistory.forEach(park => {
      
      delete park.dataValues.parkingID;
      delete park.dataValues.userID;
      delete park.dataValues.createdAt;
      delete park.dataValues.updatedAt;

      parks.push(park.dataValues);
    });

    const userC = await user.findOne({where: { userID}}); 
    const dueAmount =userC.dataValues.due
    res.render("parkHist",{users:parks,dueAmount:dueAmount});
    
  } catch (error) {
    console.log(error);
  }
}

module.exports.page = (req, res) => {

    try {
      res.locals.user =req.user;
    res.render("book");
      
    } catch (error) {
      console.log(error);
    }
  }
  module.exports.bookslot = async(req, res) => {

    try {
    res.locals.user =req.user;
    let slotID=0;
    if(req.body.floor=="Ground")slotID=0;
    else if(req.body.floor=="First")slotID=10;
    else if(req.body.floor=="Second")slotID=20;
    else if(req.body.floor=="Third")slotID=30;

    slotID=slotID+parseInt(req.body.slot);
    req.body["slot"]=slotID;

    const d = new Date();
    const time=d.getTime();
    const userC= await user.findOne({where:{userID:req.user.userID}});
    const data={
      "userID":req.user.userID,
      "regNo":userC.dataValues.regNo,
      "type":"entry",
      "lotCode":req.body.lotCode,
      "time":time
    }
    await APIEntry.create(data);
    
    if(lotCode=="srgm")bookings = await srgmLot.update({regNo:userC.dataValues.regNo,occupy:true},{where:{slotID}});
    else if(lotCode=="skkn")bookings = await skknLot.update({regNo:userC.dataValues.regNo,occupy:true},{where:{slotID}});
    else if(lotCode=="pjr")bookings = await pjrLot.update({regNo:userC.dataValues.regNo,occupy:true},{where:{slotID}});
    else if(lotCode=="thln")bookings = await thlnLot.update({regNo:userC.dataValues.regNo,occupy:true},{where:{slotID}});

    res.redirect("/book");
      
    } catch (error) {
      console.log(error);
    }
  }
  module.exports.book = async(req, res) => {

    try {
      res.locals.user =req.user;
      lotCode=req.body.lots;
      let bookings=[];
      let books=[];
      books["Ground"]=[];
      books["First"]=[];
      books["Second"]=[];
      books["Third"]=[];

      if(lotCode=="srgm")bookings = await srgmLot.findAll();
      else if(lotCode=="skkn")bookings = await skknLot.findAll();
      else if(lotCode=="pjr")bookings = await pjrLot.findAll();
      else if(lotCode=="thln")bookings = await thlnLot.findAll();

      bookings.forEach(book => {
        if(!book.dataValues.occupy)
        {
          books[book.dataValues.floor].push(book.dataValues.slotID);
        }
        
      });
      console.log(books);
      res.render("available", {users:books,lotCode});
    } catch (error) {
      console.log(error);
    }
  }