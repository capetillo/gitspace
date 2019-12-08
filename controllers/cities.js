var City = require('../models/city');
var User = require('../models/user');

module.exports = {
    index,
    create,
    // updateCity,
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



function create(req, res) {
    let newCity = new City({ city: req.body.city });

    User.findById(req.params.id).populate('city').exec(function (err, user) {
        City.findById(newCity.id, (err, city) => {
            user.city.push(newCity);
            console.log("NEW CITY BABY", newCity)
            user.save(function (err) {
                res.render('users/profile', {
                    user,
                    city
                });

            });
        });
    });
}



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

// function updateCity(req, res) {
//     City.findByIdAndUpdate(req.params.cityId, req.body, {
//         new: true
//     }
//     ).then(function (err, updatedCity) {
//         res.render(`users/${req.params.id}`, {
//             updatedCity
//         });
//     });
// }


