const { Router } = require('express');
const imageRecog = require('../controllers/imageRecog');
const fs = require('fs');
const path = require('path');
const multer = require("multer");

const router = Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname+"temp_car_number_plate_"+ path.extname(file.originalname));
    },
  });
  
  var upload = multer({ storage: storage });
  
  var uploadFile = upload.fields([{ name: 'postFile', maxCount: 1 }])

router.get('/',imageRecog.home);
router.get('/check_Vno', imageRecog.cameraAPI)
router.post('/check_Vno',uploadFile, imageRecog.Vno);

module.exports = router;