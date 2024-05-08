const {srgmLot}=require('../models')
module.exports.page = (req, res) => {

    try {
      res.locals.user =req.user;
    res.render("book");
      
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
    } catch (error) {
      console.log(error);
    }
  }