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
    name: String,
    status: [statusSchema],
    post: [postSchema]

}, {
    timestamps: true
});


module.exports = mongoose.model('Profile', profileSchema);