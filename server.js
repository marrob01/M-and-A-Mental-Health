require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const session = require('express-session');

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const Exercise = require('./models/exercies.js')
const exercises = require('./models/seedexe.js')

const mongoose = require('mongoose');

const mongoURI = process.env.MONGODBURI


const db = mongoose.connection;

mongoose.connect(mongoURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("database connection checked");
})

db.on('error', (err)=> { console.log('ERROR: ', err)});
db.on('connected', ()=> { console.log("mongo connected")})
db.on('disconnected', ()=> { console.log("mongo disconnected")})

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))



const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}

app.use((req, res, next) =>{
  res.locals.currentUser = req.session.currentUser
  next()
})



const exerciesController = require('./controller/exercies.js');
app.use('/exercies',isAuthenticated,  exerciesController);

const userController = require('./controller/users.js');
app.use('/users', userController);

const sessionsControllers = require('./controller/sessions')
app.use('/sessions', sessionsControllers);

const confirmControllers = require('./controller/confirmation.js')
app.use('/confirmation', confirmControllers);

const healthformControllers = require('./controller/healthform.js')
app.use('/healthform', healthformControllers);

app.get('/', (req, res) => {
    res.render('home.ejs')

})

app.get('/seed', (req, res)=> {

  Exercise.create( exercises, ( err , data ) => {
        if ( err ) console.log ( err.message )
    console.log( "added provided exercises data" )
    }
  );

})



app.listen(PORT,()=>{
    console.log('Server is listening!!!');
})
