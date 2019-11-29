var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/user');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
}, 
function (accessToken, refreshToken, profile, cb) {
    // a user has logged in with OAuth...
    User.findOne({ githubId: profile.id }, function (err, user) {
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
            var newUser = new Student({
                //object . the best way to obtain the information of what it contains is to 
                //console.log out - in this case Student - 
                // displayName property of profile 
                name: profile.displayName,
                //email is an array of objects. by putting the [0] we get the main obhect
                email: profile.emails[0].value,
                //AVATAR: THE PROFILE OBJECT
                githubId: profile.id
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
    //let passport know that we found our user 
    done(err, user);
});
});

//you will get a GitHub user id
//save that id to your user model
