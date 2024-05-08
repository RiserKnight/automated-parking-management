
const fs = require('fs');
const apiEntryFunct = require("./functions/apiEntry.js");



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
  module.exports.textAPI = (req, res) => {

    try {
      res.locals.user =req.user;
    res.render("textUp");
      
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
    const userC=await apiEntryFunct.apiEntry(data.Number,req);
    res.send("Entry done: "+JSON.stringify(userC));

  } catch (error) {
    console.log(error);
  }
}

module.exports.VnoT=async(req, res) => {
  try {
    const userC=await apiEntryFunct.apiEntry(req.body.Number,req);
    res.send("Entry done: "+JSON.stringify(userC));

  } catch (error) {
    console.log(error);
  }
}