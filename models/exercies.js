const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const exerciseSchema = new Schema({
    name:  {type: String },
    Description: {type: String} ,
    img: {type: String} ,
    daily: [String],

}, { timestamps: true });

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;
