const { Router } = require('express');
const imageRecog = require('../controllers/imageRecog');
const authenticate = require('../controllers/authenticate');
const booking = require('../controllers/booking');
const fs = require('fs');
const path = require('path');
const multer = require("multer");
const passport = require('passport');

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
router.get('/apiEntry', imageRecog.cameraAPI)
router.post('/apiEntry',uploadFile, imageRecog.Vno);

router.get('/apiEntryText', imageRecog.textAPI)
router.post('/apiEntryText',uploadFile, imageRecog.VnoT);

router.get('/book', booking.page)
router.post('/book', booking.book);

router.get('/register',authenticate.registerPage);
router.post('/register',authenticate.register);
router.get('/login',authenticate.login);

router.post('/login',passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/' }));
router.get('/login-failure',authenticate.loginFail);
router.get('/logout', authenticate.logout);

module.exports = router;