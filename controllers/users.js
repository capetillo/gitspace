var User = require('../models/user')
var Message = require('../models/message');

module.exports = {
  index,
  shareStatus,
  viewProfile,
  viewInbox,
  sendMessage
}

function index(req, res, next) {
  let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
    .sort(sortKey).exec(function (err, users) {
      if (err) return next(err);
      // Passing search values, name & sortKey, for use in the EJS
      console.log("USER ", users)
      res.render('users/index', {
        users,
        // if you have a user this is their mongo document
        user: req.user,
        name: req.query.name,
        sortKey
      });
    });
}

function shareStatus(req, res) {
  req.user.status.push(req.body.status)
  let newStatus = req.user.status
  User.findByIdAndUpdate(req.user.id, { status: newStatus }, { new: true }, (err, user) => {
    res.redirect('/users')
  });
}

function viewProfile(req, res) {
  User.findById(req.params.id, function (err, user) {
    res.render('users/profile', {
      user
    })
  });
}

function viewInbox(req, res) {
  User.findById(req.params.id, function (err, user) {
    res.render('users/messages', {
      user
    });
  });
}

function sendMessage(req, res) {
  // let messenger = new Message({from: req.})
  // if (req.user.id !== req.message)
  let newMessage = new Message({text: req.body.message});
  User.findById(req.params.id).populate('Message').exec((err,user) => {
    user.message.push(newMessage)
    console.log("message message" , newMessage)
    res.render('users/messages', {
      user
    })
  });
}
//     .find().populate('user')
//     res.render('users/messages')
//     .then(messages => {
//         res.status(200).json({
//             message: 'Success',
//             obj: messages
//         });
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json({
//             title: 'Error',
//             error: err
//         });
//     });
// }

// function sendMessage(req, res, next)

// //function with get method that renders the page of messages between user 1 and user 2
// // function index(req, res) {
// //     console.log("messages!!")
// //     Message.find().populate
// //     User.findById(req.params.id, function (err, messages) {
// //         res.render('messages/index', {
// //             messages
// //         });
// //     });
// // }


// // User.findById(decoded.user._id)
// // .then(user => {
// //     if (!user) throw new Error('User Not Found');

// //     const message = new Message({
// //         content: req.body.content,
// //         user: user
// //     });

// //     message.save().then(result => {
// //         user.messages.push(result._id);
// //         user.save().then(() => {
// //             res.status(201).json({
// //                 message: 'Saved Message',
// //                 obj: result
// //             });
// //         });
// //     });
// // })
// // .catch(err => {
// //     console.log(err);
// //     res.status(500).json({
// //         title: 'An Error Occurred',
// //         error: err
// //     });
// // });
// // });
// // function with post method that when clicked (button on ejs will have a form with 
// // post method and the path will be sent to the page to save the info )


// // function sendMessage(req, res) {
// //     req.message.text.push(req.body);
// //     let newMessage = req.message.text
// //     Message.findByIdAndUpdate(req.message.id, {message: newMessage}, {new: true}, (err, message) => {
// //         res.redirect('/messages/index')
// //     });
// // }

//       // if message is scheduled, send it on the scheduled date 
//       // if not scheduled, send it on click

// // function deleteMessage(req, res) {

// // }