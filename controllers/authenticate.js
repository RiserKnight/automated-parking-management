const {user} = require('../models')
module.exports.registerPage = (req, res) => {

    try {
      res.locals.user =req.user;
    res.render("register");
      
    } catch (error) {
      console.log(error);
    }
  }

  module.exports.login = (req, res) => {

    try {
      res.locals.user =req.user;
      if(!(req.session.failStatus))req.session.failStatus=false;
      res.locals.failStatus=req.session.failStatus;
      req.session.failStatus=false;
      res.render("login");
    } catch (error) {
      console.log(error);
    }
  }
  module.exports.register =async(req, res) => {
    let code="000"
    res.locals.user =req.user;
    try {
      
      console.log(req.body);
      const userD=await user.findOne({where:{email:req.body.email}});
      if(!userD)
      {
        await user.create(req.body);
        code="201";
      }
      else code="200"
    } catch (error) {
      code="500"
      console.log(error);
    }
    finally{
      res.send({"code":code});
    }
  }
  module.exports.loginFail = async (req, res) => {
    res.locals.user =req.user;
    req.session.failStatus = true;
    res.redirect("/login"); 
  }
  module.exports.logout = (req, res,next) => {

    try {
      res.locals.user =req.user;
      req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });

    } catch (error) {
      console.log(error);
    }
    
    
  }
