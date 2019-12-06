var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    status: [String],
    message: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    githubId: String,
    city: [{type: mongoose.Schema.Types.ObjectId, ref: 'City'}]
  }, {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);