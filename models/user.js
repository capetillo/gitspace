var mongoose = require('mongoose');


var eventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  about: String,
  location: String
  // guests: [userSchema]
  //https://stackoverflow.com/questions/29078753/how-to-reference-another-schema-in-my-mongoose-schema
});

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    status: [String],
    event: [eventSchema],
    message: [{type: mongoose.Schema.Types.ObjectId, ref: "Message"}]
  }, {
    timestamps: true
  });



module.exports = mongoose.model('User', userSchema);