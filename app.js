const express = require('express');
const  bodyParser = require('body-parser');
const routes = require('./routes/routes');
const {sequelize}=require('./models');
const passport = require('passport')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('./config/passport');
require('./models/session');

require('dotenv').config();

const app = express();

app.use(express.static(__dirname+"/public"));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
    },
    store: new SequelizeStore({
      db: sequelize,
      table: 'session',
   }),
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());
app.use(routes);

app.listen(app.get('port'), async()=> {
    console.log(`Server started on port ${app.get('port')}`);
    await sequelize.authenticate();
     console.log("db connected"); 
 
    //  const infoI = await info.findOne({where:{infoID:101}});
    //  if(!infoI){
    //    const infoID=101;
    //    const purpose="userID";
    //    const dataT="Int";
    //    const value="2023000";
    //    await info.create({infoID,purpose,dataT,value})
    //  }
    });