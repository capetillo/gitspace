var City = require('../models/city');
var User = require('../models/user');

module.exports = {
    index,
    create,
    // addToProfile,
    // updateCity,
};

// I have to pass city in users ctrl to access the diff properties of cities on users ejs 

function create(req, res) {
    User.findById(req.params.id).populate('city').exec(function (err, user) {
        console.log("USER USER USER", user)
        let newCity = new City({ city: req.body.city });
        City.findById(newCity.id, (err, city) => {
            user.city.push(newCity);
             user.save(function (err, user) {
                res.render('users/cities', {
                    user,
                     city
                 });
            });
         });
    });
}


//maybe this function is not necessary 
// function addToProfile(req, res) {
//     let newCity = req.user.city
//     newCity.push(req.body.city)
//     console.log("RAG CITY BITCH", newCity)
//     User.findByIdAndUpdate(req.user.id, { city: newCity }, { new: true }, (err, user) => {
//         res.redirect(`/users/${user.id}`)
//     });
// }


function index(req, res) {
    User.findById(req.params.id, function (err, user) {
        res.render('cities/index', {
            user
        });
      });
};

// function updateCity(req, res) {
//     City.findByIdAndUpdate(req.params.cityId, req.body, {
//         new: true
//     }
//     ).then(function (err, updatedCity) {
//         res.redirect(`/users/${req.params.id}/cities/${req.params.cityId}`)
//     })
// }


