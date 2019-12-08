var mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('City', citySchema);



