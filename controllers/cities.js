var City = require('../models/city');
var User = require('../models/user');

module.exports = {
    index,
    create,
    updateCity,


};

// I have to pass city in users ctrl to access the diff properties of cities on users ejs 

// function create(req, res) {
//     User.findById(req.params.id).populate('city').exec(function (err, user) {
//         let newCity = new City({ city: req.body.city });
//         console.log("NEW CITY BABY", newCity)
//         City.findById(newCity.id, (err, city) => {
//             user.city.push(newCity);
//              user.save(function (err, user) {
//                 res.render('users/cities', {
//                     user,
//                      city
//                  });
//             });
//          });
//     });
// }

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
            console.log("NEW CITY ID", newCity.id)
            user.city.push(newCity);
            user.save(function (err) {
                console.log("USER WHEN CREATING CITY", user)
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
    console.log("REQ BODY CITY", req.body.updatedCity)
    City.findByIdAndUpdate(updatedCity.id, updatedCity, (err, city) => {
        User.findById(req.params.id).populate('city').exec(function (err, user) {
            user.city.push(updatedCity);
            user.save(function (err) {


                console.log("USER AFTER UPDATING CITY", user)
                res.render('users/profile', {

                    user,
                    city
                })
            })
        });
    });
}
