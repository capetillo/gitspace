var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');

passport.use(new GoogleStrategy({
    // first property is clientID (notice that ID is capitalized):
    // we put the clientID on the env file so we're getting it 
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    //passReqToCallback: true
},

    //accessToken: what they want to do with it
    // refreshToken: OAuth 2 tokens we get are only good for an hour and hten they expire and what you have to do is to get a new token by refreshing
    // their profile
    // callback to call serializeUser function 
    function (accessToken, refreshToken, profile, cb) {
        // a user has logged in with OAuth...
        User.findOne({ googleId: profile.id }, function (err, user) {
            // if no document can be found, return an error
            if (err) return cb(err);
            // if we get a document, return user
            if (user) {
                console.log("THIS IS USER" , user)
                if(!user.avatar) {
                    //update code here!!!!!!!!HERE!!!!!!!
                    //HERE HERE HERE HERE

                    return cb(null, user);

                }
            } else {
                // we have a new student via OAuth
                var newUser = new User({
                    //object . the best way to obtain the information of what it contains is to 
                    //console.log out - in this case Student - 
                    // displayName property of profile 
                    name: profile.displayName,
                    //email is an array of objects. by putting the [0] we get the main obhect
                    email: profile.emails[0].value,
                    //AVATAR: THE PROFILE OBJECT
                    googleId: profile.id
                });
                newUser.save(function (err) {
                    if (err) return cb(err);
                    return cb(null, newUser);
                });
            }
        });
    }
));
//                                  done is a callback function that passport is providing for us 
passport.serializeUser(function (user, done) {
    // .id is the mongoose version of id. .id doesn't work on the client side, only the server side
    done(null, user.id)
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        //let passport know that we found our student 
        done(err, user);
    });
});