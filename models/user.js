var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  about: String,
  // guests: [userSchema]
})

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    status: [String],
    event: [eventSchema]
    
  }, {
    timestamps: true
  });



module.exports = mongoose.model('User', userSchema);