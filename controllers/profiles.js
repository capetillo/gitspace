var Profile = require('../models/profile');

module.exports = {
    index,
    addStatus,
    delete: deleteStatus
}
// (get method) function that renders user's profile 

function index(req, res, next) {
    console.log("REQ QUERY BABY" , req.query.name)
    // Make the query object to use with Student.find based up
    // the user has submitted the search form or now
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    // Default to sorting by name
    let sortKey = req.query.sort || 'name';
    Profile.find(modelQuery)
    .sort(sortKey).exec(function(err, profiles) {
      if (err) return next(err);
      // Passing search values, name & sortKey, for use in the EJS
      res.render('profiles/index', { 
        profiles, 
        // if you have a user this is their mongo document v
        user: req.user,
        name: req.query.name, 
        googleId: req.query.googleId,
        sortKey 
      });
    });
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