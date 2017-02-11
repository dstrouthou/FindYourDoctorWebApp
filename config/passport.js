// config/passport.js
var pg = require('pg');
var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
var LocalStrategy   = require('passport-local').Strategy;

// load the user model
var mysql = require('pg');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');

var connection = new pg.Client(db);
connection.connect();

module.exports = function(passport) {
    // passport session setup
    // Derialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query('SELECT * FROM "users" WHERE id = ($1)',[id], function(err, rows){
            console.log(rows.rows[0]);
            done(err, rows.rows[0]);
        });
    });

    // LOCAL SIGNUP
    passport.use(
        'local-signup',
        new LocalStrategy({
                // Local strategy uses username and password
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true // Passing back the entire request to the callback
            },
            function(req, username, password, done) {
                var connection = new pg.Client(db);
                connection.connect();
                // check whether the user already exists
                connection.query("SELECT * FROM users WHERE username = ($1)",[username], function(err, rows) {
                    console.log(rows);
                    if (rows.rows.length!=0) {
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    } else {
                        // Create the user if not exists
                        var newUserMysql = {
                            username: username,
                            password: bcrypt.hashSync(password, null, null), // use the generateHash function in our user model
                            fname: req.body.fname,
                            sname: req.body.sname,
                            email: req.body.email,
                            dateofbirth: req.body.dateofbirth,
                            selectsex: req.body.selectsex

                        };


                        connection.query('INSERT INTO users ( "username", "password", "fname", "sname", "email", "dateofbirth", "sex", "type" ) values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id',
                            [newUserMysql.username, newUserMysql.password, newUserMysql.fname, newUserMysql.sname, newUserMysql.email, newUserMysql.dateofbirth, newUserMysql.selectsex, "patient"],
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

    // LOCAL LOGIN
    passport.use(
        'local-login',
        new LocalStrategy({
                // Local strategy uses username and password
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true // Passing back the entire request to the callback
            },
            function(req, username, password, done) {
                var connection = new pg.Client(db);
                connection.connect();
                connection.query("SELECT * FROM users WHERE username = ($1)",[username], function(err, rows){
                    console.log(rows.rows);
                    // if the username is wrong
                    if (!rows.rows[0]) {
                        return done(null, false, req.flash('loginMessage', 'No user found.'));
                    }
                    if (err)
                        return done(err);

                    // if the user name is correct but the password is wrong
                    if (!bcrypt.compareSync(password, rows.rows[0].password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                    // if username and password are correct then user gain access to the system
                    return done(null, rows.rows[0]);
                });
            })
    );
};