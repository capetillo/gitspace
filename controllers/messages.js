var Message = require('../models/message');

module.exports = {
    index,
    sendMessage,
    delete: deleteMessage
}

//function with get method that renders the page of messages between user 1 and user 2
function index(req, res) {
    res.render('/index')
}

// function with post method that when clicked (button on ejs will have a form with 
// post method and the path will be sent to the page to save the info )
function sendMessage(req, res) {
    req.user.conversation.push(req.body);
    req.user.save(function(err) {
      res.redirect('/messages/index');
      // if message is scheduled, send it on the scheduled date 
      // if not scheduled, send it on click
});
}

function deleteMessage(req, res) {
    
}