const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const config = require('./config');
const routes = require('./routes');
const passport = require('./heplers/passport');

const app = express();

app.use(cookieParser());
app.use(cookieSession({secret: 'SESSION_SECRET', httpOnly: false}));
app.use(passport.initialize());

app.use(bodyParser.urlencoded({extended: true}));

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.listen(config.server.port, () => {
    console.log('\n%s is listening in %d', config.app.name, config.server.port);
});
