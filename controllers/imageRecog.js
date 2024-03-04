
const fs = require('fs');
const path = require('path');
const multer = require("multer");


function imageToBase64(imagePath) {
    // Read the image file as a buffer
    const imageBuffer = fs.readFileSync(imagePath);

    // Convert the buffer to a base64 string
    const base64String = imageBuffer.toString('base64');

    return base64String;
}

module.exports.home = (req, res) => {

    try {

    res.send("Home");
      
    } catch (error) {
      console.log(error);
    }
  }
  
  module.exports.cameraAPI = (req, res) => {

    try {

    res.render("imageUp");
      
    } catch (error) {
      console.log(error);
    }
  }
 

  module.exports.Vno=async(req, res) => {
  try {
    const fileName="./uploads/"+req.files.postFile[0].filename;
   
    const base64String = imageToBase64(fileName);

    const result = await fetch('http://127.0.0.1:8000/node_call', { 
      method: 'POST', 
      body: JSON.stringify({"data":base64String}),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await result.json();
    console.log(data);
    res.send(data);

  } catch (error) {
    console.log(error);
  }
}