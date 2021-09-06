const passport = require('passport');
const {Strategy: TwitchStrategy} = require('passport-twitch-strategy');

const {locals: {callbackURL}} = require('../config');

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID || '';
const TWITCH_SECRET = process.env.TWITCH_SECRET || '';

passport.use('twitch', new TwitchStrategy({
        clientID: TWITCH_CLIENT_ID,
        clientSecret: TWITCH_SECRET,
        callbackURL,
        scope: 'chat:read'
    }, (accessToken, refreshToken, profile, done) => {
        done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
