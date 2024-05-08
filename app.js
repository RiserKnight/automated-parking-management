const express = require('express');
const  bodyParser = require('body-parser');
const routes = require('./routes/routes');
const {sequelize,user}=require('./models');
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
    
sequelize
.query("select * from pg_extension where extname='pg_trgm';")
.then((result) =>{
  if(!result){
  sequelize
  .query("CREATE EXTENSION IF NOT EXISTS pg_trgm;")
  .then(() => console.log("Extension installed successfully."))
  .catch((error) => console.log(error));
  }
})
.catch((error) => console.log(error));

     console.log("db connected");
   
     const userJhon= await user.findOne({where:{email:"john@example.com"}});
     if(!userJhon){
      const usersData=[
        { name: 'John Doe', regNo: "21BH0001AA",contact:9131432828, email: 'john@example.com',pass:"1234" },
        { name: 'Varun', regNo: "MH20CS1941",contact:9131432828, email: 'varun@example.com',pass:"1234" },
        { name: 'Ajay Ghale', regNo: "P688CC",contact:9131432828, email: 'ajay@example.com',pass:"1234" },
        { name: 'Parth', regNo: "TN52U1580",contact:9131432828, email: 'parth@example.com',pass:"1234" },
        { name: 'Spider Man', regNo: "MH15TC554",contact:9131432828, email: 'spidey@example.com',pass:"1234" },
        { name: 'Tony Stark', regNo: "RJ27TC0530",contact:9131432828, email: 'tony@example.com',pass:"1234" },
        { name: 'Aayush', regNo: "MH20CS9817",contact:9131432828, email: 'aayush@example.com',pass:"1234" },
        { name: 'Mohan', regNo: "MH20BY3665",contact:9131432828, email: 'mohan@example.com',pass:"1234" },
      ];
      const createdUsers = await Promise.all(usersData.map(userData => user.create(userData)));
     } 

    });