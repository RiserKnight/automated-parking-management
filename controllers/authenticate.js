
module.exports.register = (req, res) => {

    try {

    res.render("register");
      
    } catch (error) {
      console.log(error);
    }
  }

  module.exports.login = (req, res) => {

    try {

    res.render("login");
      
    } catch (error) {
      console.log(error);
    }
  }