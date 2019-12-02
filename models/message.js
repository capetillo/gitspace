var mongoose = require('mongoose');

var conversationSchema = new mongoose.Schema({
    text: String
}, {
    timestamps: true
});

var messageSchema = new mongoose.Schema({
    name: String,
    conversation: [conversationSchema],


}, {
    timestamps: true
});


module.exports = mongoose.model('Message', messageSchema);