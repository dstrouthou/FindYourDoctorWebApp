var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg');
var passport = require('passport');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var calendar = require('./routes/calendar');
var appform = require('./routes/appform');
var email = require('./routes/email');
var home = require('./routes/home');
var settings = require('./routes/settings');
var login1 = require('./routes/login1');
var social = require('./routes/social');
var helper = require('./routes/helper');
var nodemailer = require('nodemailer');



var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
pg.defaults.ssl = true;
require('./config/passport')(passport); // pass passport for configuration
var smtpTransport = nodemailer.createTransport("SMTP",{
  service: "Gmail",
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  // host: "smtp.live.com",
  // port: 587,

  auth: {
    user:  'demetristrouthou@gmail.com',
    pass:  'Mitsos019'
  }
  // tls: {
  //   ciphers:'SSLv3'
  // }

});

var app = express();
var flash    = require('connect-flash');
// custom libraries
// routes
var route = require('./routes');
// model

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(function(req,res,next){
  req.smtpTransport=smtpTransport;
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({
  secret: 'vidyapathaisalwaysrunning',
  resave: true,
  saveUninitialized: true
} )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/routes')(app, passport); // load our routes and pass in our app and fully configured passport
app.use('/', routes);


app.use('/', routes);
app.use('/users', users);
app.use('/calendar', calendar);
app.use('/appform', appform);
app.use('/email', email);
app.use('/home', home);
app.use('/settings', settings);
app.use('/login1', login1);
app.use('/social', social);
app.use('/helper', helper);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (req,res,next) {
  req.db = db;
  next();

});

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
  extended: true
}));

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('pages/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
