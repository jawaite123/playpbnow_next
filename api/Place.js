const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlaceSchema = new Schema({
  is: String,
  title: String
})

module.exports = mongoose.models.Place || mongoose.model('Place', PlaceSchema)