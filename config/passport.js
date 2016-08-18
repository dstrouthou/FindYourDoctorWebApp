// config/passport.js
var pg = require('pg');
var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';


// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('pg');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');

var connection = new pg.Client(db);
connection.connect();

// connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query('SELECT * FROM "users" WHERE id = ($1)',[id], function(err, rows){
            console.log(rows.rows[0]);
            done(err, rows.rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) {
                var connection = new pg.Client(db);
                connection.connect();
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                connection.query("SELECT * FROM users WHERE username = ($1)",[username], function(err, rows) {
                    // if (err)
                    //     return done(err);
                    console.log(rows);
                    if (rows.rows.length!=0) {
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    } else {
                        // if there is no user with that username
                        // create the user
                        var newUserMysql = {
                            username: username,
                            password: bcrypt.hashSync(password, null, null), // use the generateHash function in our user model
                            fname: req.body.fname,
                            sname: req.body.sname,
                            email: req.body.email,
                            dateofbirth: req.body.dateofbirth,
                            selectsex: req.body.selectsex

                        };


                        connection.query('INSERT INTO users ( "username", "password", "fname", "sname", "email", "dateofbirth", "sex" ) values ($1,$2,$3,$4,$5,$6,$7) RETURNING id',
                            [newUserMysql.username, newUserMysql.password, newUserMysql.fname, newUserMysql.sname, newUserMysql.email, newUserMysql.dateofbirth, newUserMysql.selectsex],
                            function(err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(result.rows[0]);
                                    newUserMysql.id = result.rows[0].id;
                                }

                            return done(null, newUserMysql);
                        });
                    }
                });
            })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) { // callback with email and password from our form
                var connection = new pg.Client(db);
                connection.connect();
                connection.query("SELECT * FROM users WHERE username = ($1)",[username], function(err, rows){
                    console.log(rows.rows);
                    if (!rows.rows[0]) {
                        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                    }
                    if (err)
                        return done(err);


                    // if the user is found but the password is wrong
                    if (!bcrypt.compareSync(password, rows.rows[0].password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                    // all is well, return successful user
                    return done(null, rows.rows[0]);
                });
            })
    );
};