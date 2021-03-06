var User = require('../models/user')
var Message = require('../models/message');
var City = require('../models/city');
module.exports = {
  index,
  shareStatus,
  viewProfile,
  viewInbox,
  sendMessage,
  delete: deleteMessage,
}

function index(req, res, next) {
  let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
    .sort(sortKey).exec(function (err, users) {
      if (err) return next(err);
      res.render('users/index', {
        users,
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
    City.find({}, function (err, city) {
      res.render('users/profile', {
        user,
        city
      });
    })
  });
}

function viewInbox(req, res) {
  User.findById(req.params.id).populate('message').exec((err, user) => {
    res.render('users/messages', {
      user
    });
  });
};

function sendMessage(req, res) {
  let newMessage = new Message({ text: req.body.message });
  User.findById(req.params.id).populate('message').exec(function (err, user) {
    Message.findById(newMessage.id, (err, message) => {
      user.message.push(newMessage);
      user.save(function (err, user) {
        res.render('users/messages', {
          user,
          message
        });
      });
    });
  });
};

function deleteMessage(req, res) {
  Message.findByIdAndDelete(req.params.messageId, function (err) {
    res.redirect(`/users/${req.params.id}/messages`)

  });
};




