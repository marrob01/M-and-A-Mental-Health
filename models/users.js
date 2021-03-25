const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const userSchema = new Schema({
    username:  {type: String, required:true, unique:true },
    email: String,
    password: String,

});

const User = model('User', userSchema);

module.exports = User;
