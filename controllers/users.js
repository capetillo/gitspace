var User = require('../models/user')

module.exports = {
    index,
    shareStatus,
    viewProfile
}

// renders the log in page
// function index(req, res) {
//     console.log("REQ BODY" , req.body);
//     res.render('users/index');
// }



function index(req, res, next) {
  

    // Make the query object to use with Student.find based up
    // the user has submitted the search form or now
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    // Default to sorting by name
    let sortKey = req.query.sort || 'name';
    User.find(modelQuery)
    .sort(sortKey).exec(function(err, users) {
      if (err) return next(err);
      // Passing search values, name & sortKey, for use in the EJS
      console.log("USER ", users)
      res.render('users/index', { 
        users, 
        // if you have a user this is their mongo document v
        user: req.user,
        name: req.query.name, 
        sortKey 
      });
    });
  }

  function shareStatus(req, res) {
    req.user.status.push(req.body.status)
    let newStatus = req.user.status
    User.findByIdAndUpdate(req.user.id, {status: newStatus}, {new: true}, (err, user) => {
      res.redirect('/users')
    })
    
  }

  
function viewProfile(req, res) {
  User.findById(req.params.id, function(err, user) {
    res.render('users/profile', {
      user
    })
  });
}