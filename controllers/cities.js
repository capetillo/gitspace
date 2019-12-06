var City = require('../models/city');
var User = require('../models/user');

module.exports = {
    index,
    create,
    addToProfile,
    updateCity,
};

function create(req, res) {
    City.create(req.body, function(err, city) {
        res.redirect('/cities')
    });
}

function addToProfile(req, res) {
    let newCity = new City({ text: req.body.city });
    console.log("NEW CITY BINCH", newCity)
    User.findByIdAndUpdate(req.params.id).populate('city').exec(function (err, city) {
        user.city.push(newMessage);
        City.findById(newCity.id, (err, city) => {
            city
        });
    });
}

function index(req, res) {
    res.render('cities/index')
};

function updateCity(req, res) {
    City.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }
    ).then(function (err, updatedCity) {
        res.redirect(`/cities/${req.params.id}`)
    })
}


