const _ = require('lodash');
var fs = require('fs');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
let mongoose = require('mongoose');
let appEnv = process.env.NODE_ENV || 'prod';
let config = require('./app/config/app')[appEnv];

var app = express();

// Config
let sessionConfig = require('./app/config/session');
let dbConf = require('./app/config/mongo');
let db = require('./app/scripts/db');
var cacheDB;
var dbConnection = db.connect(dbConf[appEnv]);


// Middle Wares

app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware - Fetch User, Account and set to request object
app.use(session({
    resave: true,
    name: 'sid',
    saveUninitialized: false,
    secret: sessionConfig.secret,
    store: new MongoStore({mongooseConnection: mongoose.connection, clear_interval: 3600}),
    cookie: {
        secure: false,
        httpOnly: false,
        path: '/',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(require('./app/routes'));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.use((err, req, res, next) => {
  if (err.name === "NotFoundError")
      res.status(404).json({
          status: 404,
          msg: 'Url not Found'
      });
  else
      res.status(500).json({
          status: 500,
          msg: 'server error',
          err: err
      })
});
// Error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
})


app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
module.exports = app;
