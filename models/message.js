var mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    created: {
      type: Date,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    conversationId: {
      type: String,
      required: true
    },
    online: {
      type: Boolean,
      required: false
    },
  });

  module.exports = mongoose.model('Message', messageSchema);