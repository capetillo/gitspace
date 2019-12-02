var mongoose = require('mongoose');

var statusSchema = new mongoose.Schema({
    text: String
}, {
    timestamps: true
});

var profileSchema = new mongoose.Schema({
    name: String,
    status: [statusSchema],


}, {
    timestamps: true
});


module.exports = mongoose.model('Profile', profileSchema);