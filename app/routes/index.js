const path = require('path');
const {Router} = require('express');
const get = require('lodash/get');

const {locals: {callbackURL}} = require('../config');
const passport = require('../heplers/passport');

const router = Router();

router.get('/', (req, res) => {
    if(get(req, 'session.passport.user', null)) {
        res.sendFile(path.resolve(__dirname, '../public/index.html'));
    } else {
        res.redirect('/login/');
    }
});

router.get('/login/', (req, res) => {
    if(get(req, 'session.passport.user', null)) {
        res.redirect('/');
    } else {
        res.send('<html><head><title>Authorize via Twitch</title></head><a href="/auth/twitch">Authorize via Twitch</a></html>');
    }
});

router.get('/auth/twitch/', passport.authenticate('twitch'));

router.get(callbackURL, passport.authenticate('twitch', { failureRedirect: '/login/' }), (req, res) => {
    res.redirect('/');
});

module.exports = router;
