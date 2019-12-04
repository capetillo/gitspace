var Message = require('../models/message');
var User = require('../models/user');

module.exports = {
    index,
    // sendMessage,
    // delete: deleteMessage
}


//function with get method that renders the page of messages between user 1 and user 2
function index(req, res) {
    console.log("messages!!")
    User.findById(req.params.id, function (err, messages) {
        res.render('messages/index', {
            messages
        });
    });
}

// function with post method that when clicked (button on ejs will have a form with 
// post method and the path will be sent to the page to save the info )


// function sendMessage(req, res) {
//     req.message.text.push(req.body);
//     let newMessage = req.message.text
//     Message.findByIdAndUpdate(req.message.id, {message: newMessage}, {new: true}, (err, message) => {
//         res.redirect('/messages/index')
//     });
// }
    
      // if message is scheduled, send it on the scheduled date 
      // if not scheduled, send it on click

// function deleteMessage(req, res) {
    
// }