const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const healthSchema = new Schema({
  tip1: String,
  tip2: String,
  tip3: String,

}, { timestamps: true });

const Health = model('Health', healthSchema);


module.exports = Health;
