var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    status: [String],
    
  }, {
    timestamps: true
  });



module.exports = mongoose.model('User', userSchema);