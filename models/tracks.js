const mongoose = require('mongoose'); // allows us to talk to mongodB using JavaScript

const trackSchema = mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
  }); // this is the SHAPE of the data that we are tracking/collecting with mongoDB
  
const Track = mongoose.model('Track', trackSchema);
// the pedmodel is the object that we can use that can preform CRUDopetations on the database
// examples of CRUD methods this lets us use
// .create()
// .find()
// .findById()
// .findByIdAndUpdate
// .deleteOne()
// .findByAndDelete()
module.exports = Track;