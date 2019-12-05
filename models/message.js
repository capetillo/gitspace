var mongoose = require('mongoose');


var messageSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true
    },
    from: {
        type: String,
        required: true
    }
  });

  module.exports = mongoose.model('Message', messageSchema);