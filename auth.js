const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');

// Authentication Implementation

passport.use(new LocalStrategy(async (userName, pwd, done) => {
  try {
    //console.log('Received credentials: ', userName, pwd);
    const user = await Person.findOne({ username: userName });
    
    if (!user) {
      return done(null, false, { message: "Invalid username" });
    }

    //const isPasswordMatched = user.password === pwd ? true : false;
    const isPasswordMatched = await user.comparePassword(pwd);
    if (isPasswordMatched) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Invalid Password" });
    }

  } catch (error) {
    return done(error);
  }
}));

module.exports = passport;

