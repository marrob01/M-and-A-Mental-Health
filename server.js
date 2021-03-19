require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const session = require('express-session');

const methodOverride = require('method-override')
app.use(methodOverride('_method'))


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
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
}))

app.get('/', (req, res) => {
    res.render('home.ejs')

})

app.get('/about', (req, res) => {
    res.render('about.ejs')

})
// app.get('/', (req, res) => {
//     res.render('home.ejs', {
//         currentUser: req.session.currentUser
//     })
// })


app.listen(PORT,()=>{
    console.log('Server is listening!!!');
})
