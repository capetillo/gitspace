var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  text: String
}, {
  timestamps: true
});

var statusSchema = new mongoose.Schema({
  text: String
}, {
  timestamps: true
});

var profileSchema = new mongoose.Schema({
  text: String
}, {
  timestamps: true
})

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    status: [statusSchema],
    post: [postSchema],
    profile: [profileSchema]
  }, {
    timestamps: true
  });



module.exports = mongoose.model('User', userSchema);