var Profile = require('../models/profile');

module.exports = {
    index,
    addStatus,
    delete: deleteStatus
}
// (get method) function that renders user's profile 
function index(req, res) {
    res.render('profiles/index')
}

// (thru post method) Creates a new status/post 
function addStatus(req, res) {
    //compare to students sei addFact function. 
    // it accesses facts thru student schema (from Student model, in this case Profile)
    // so that means I have to create a new Profile schema 
    req.user.status.push(req.body);
    req.user.save(function(err) {
      res.redirect('/profiles/index');
    });
}


   
  

// (override post method) deletes post

function deleteStatus(req, res) {
    req.user.status.delete(req.body, function(err) {
        res.redirect('/profile/index')
    });
}
// 