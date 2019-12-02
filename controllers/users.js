var User = require('../models/user')

module.exports = {
    index
}

// renders the log in page
function index(req, res) {
    console.log("REQ BODY" , req.body);
    res.render('users/index');
}


