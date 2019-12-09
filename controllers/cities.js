var City = require('../models/city');
var User = require('../models/user');

module.exports = {
    index,
    create,
    updateCity
};

function index(req, res) {
    User.findById(req.params.id, function (err, user) {
        City.find({}, function (err, city) {

            res.render('cities/index', {
                user,
                city
            })
        });
    });
};

function create(req, res) {
    let newCity = new City({ city: req.body.city });
    City.findById(newCity.id, (err, city) => {
        User.findById(req.params.id).populate('city').exec(function (err, user) {
            user.city.push(newCity);
            user.save(function (err) {
                res.render('users/profile', {
                    user,
                    city
                });
            });
        });
    });
}

function updateCity(req, res) {
    let updatedCity = new City({ city: req.body.updatedCity })
    City.findByIdAndUpdate(updatedCity.id, updatedCity, (err, city) => {
        User.findById(req.params.id).populate('city').exec(function (err, user) {
            user.city.push(updatedCity);
            user.save(function (err) {
                res.render('users/profile', {
                    user,
                    city
                });
            })
        });
    });
}
