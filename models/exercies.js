const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const exerciseSchema = new Schema({
    name:  {type: String },
    Description: {type: String} ,
    rating: {type: Number, min:0, max:5, default: true},
    daily: [String],

}, { timestamps: true });

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;
