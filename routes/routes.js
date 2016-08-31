/**
 * Created by demetristrouthou on 7/27/2016.
 */

var pg = require('pg');
var async=require('async');
var moment=require('moment');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('pages/login', { message: req.flash('loginMessage') }); // load the login file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('pages/login', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('pages/signup', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/home', isLoggedIn, function(req, res) {
        var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';

        var app;
        var notif;
        async.parallel([	//use of async not depented events
            function(callback) {
                var client = new pg.Client(db);
                client.connect();
                console.log(req.body);

                var userid = req.user.id;
                var query = client.query('SELECT * FROM public."AppointmentDetails" WHERE (userid=$1 or "AppointmentDetails"."drID"=$3) and "AppointmentDetails"."status"= $2 ', [userid, "accepted", userid]);

                query.on("row", function (row, result) {
                    var t = row.start;
                    var t2 = moment(t).format("MM/DD/YYYY");
                    row.start = t2;
                    var v = row.start;
                    var v2 = moment(v).format("hh:mm");

                    var e = row.end;
                    var e2 = moment(e).format("hh:mm");
                    row.end = e2;

                    row.sttime = v2;
                    result.addRow(row);


                });
                query.on("end", function (result) {

                    console.log("asdasdas", req.user, "asdasda");
                    client.end();
                    //result=JSON.stringify(result.rows);
                    app= result.rows;
                    callback();



                    // res.render('pages/home', {
                    //     user: req.user,// get the user out of session and pass to templatere
                    //     app: result.rows
                    // });

                });

            },function(callback) {

                var client = new pg.Client(db);
                client.connect();
                console.log(req.body);

                var userid=req.user.id;
                var query=client.query('SELECT * FROM public."AppointmentDetails" inner join public."users" on users."id"="AppointmentDetails"."drID" WHERE ("AppointmentDetails"."drID"=$1 OR "AppointmentDetails"."userid"=$3)  and "AppointmentDetails"."status"=$2 order by start asc', [userid,"pending",userid]);

                query.on("row", function (row, result) {
                    var t=row.start;
                    var t2=moment(t).format("MM/DD/YYYY");
                    row.start=t2;
                    var v=row.start;
                    var v2=moment(v).format("hh:mm");

                    var e=row.end;
                    var e2=moment(e).format("hh:mm");
                    row.end=e2;

                    row.sttime=v2;
                    result.addRow(row);


                });
                query.on("end", function (result) {

                    console.log("asdasdas",req.user,"asdasda");
                    client.end();
                    //result=JSON.stringify(result.rows);

                   notif=result.rows;
                    callback()
                });



            }
            ],function(err) { //This function gets called after the two tasks have called their "task callbacks"
            if (err) return next(err); //If an error occured, we let express/connect handle it by calling the "next" function
            //Here locals will be populated with 'user' and 'posts'
            //console.log(results.service);
            res.render('pages/home', {
                user: req.user,// get the user out of session and pass to template
                app: app,
                notif: notif

            });
        });

    });
    app.get('/calendar', isLoggedIn, function(req, res) {
        var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
        var client = new pg.Client(db);
        var notif;
        client.connect();
        console.log(req.body);

        var userid=req.user.id;
        var query=client.query('SELECT * FROM public."AppointmentDetails" inner join public."users" on users."id"="AppointmentDetails"."drID" WHERE ("AppointmentDetails"."drID"=$1 OR "AppointmentDetails"."userid"=$3)  and "AppointmentDetails"."status"=$2 order by start asc', [userid,"pending",userid]);

        query.on("row", function (row, result) {
            var t=row.start;
            var t2=moment(t).format("MM/DD/YYYY");
            row.start=t2;
            var v=row.start;
            var v2=moment(v).format("hh:mm");

            var e=row.end;
            var e2=moment(e).format("hh:mm");
            row.end=e2;

            row.sttime=v2;
            result.addRow(row);


        });
        query.on("end", function (result) {

            console.log("asdasdas",req.user,"asdasda");
            client.end();
            //result=JSON.stringify(result.rows);

            res.render('pages/calendar', {
                user : req.user ,// get the user out of session and pass to templatere
                notif:result.rows
            });
        });

    });
    app.get('/email', isLoggedIn, function(req, res) {
        var app;
        var myinfo;
        async.parallel([	//use of async not depented events
            function(callback) {


                var db = process.env.DATABASE_URL || 'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
                var client = new pg.Client(db);
                client.connect();
                console.log(req.body);

                var userid = req.user.id;
                var query = client.query('SELECT * FROM public."AppointmentDetails" inner join public."users" on users."id"="AppointmentDetails"."drID" WHERE ("AppointmentDetails"."drID"=$1 OR "AppointmentDetails"."userid"=$3)  and "AppointmentDetails"."status"=$2 order by start asc', [userid, "pending", userid]);

                query.on("row", function (row, result) {
                    var t = row.start;
                    var t2 = moment(t).format("MM/DD/YYYY");
                    row.start = t2;
                    var v = row.start;
                    var v2 = moment(v).format("hh:mm");

                    var e = row.end;
                    var e2 = moment(e).format("hh:mm");
                    row.end = e2;

                    row.sttime = v2;

                    result.addRow(row);


                });
                query.on("end", function (result) {

                    client.end();
                    //result=JSON.stringify(result.rows);
                    app=result.rows;
                    callback();


                });
            },function(callback){

                var db = process.env.DATABASE_URL || 'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
                var client = new pg.Client(db);
                client.connect();
                console.log(req.body);

                var userid = req.user.id;
                var query = client.query('SELECT * FROM public."AppointmentDetails" inner join public."users" on users."id"="AppointmentDetails"."userid" WHERE ("AppointmentDetails"."drID"=$1 OR "AppointmentDetails"."userid"=$3)  and "AppointmentDetails"."status"=$2 order by start asc', [userid, "pending", userid]);

                query.on("row", function (row, result) {
                    var t = row.start;
                    var t2 = moment(t).format("MM/DD/YYYY");
                    row.start = t2;
                    var v = row.start;
                    var v2 = moment(v).format("hh:mm");

                    var e = row.end;
                    var e2 = moment(e).format("hh:mm");
                    row.end = e2;

                    row.sttime = v2;

                    result.addRow(row);


                });
                query.on("end", function (result) {

                    client.end();
                    //result=JSON.stringify(result.rows);
                    console.log("ASDADADADASDA",result.rows,"ASDADAASASDDADASD");
                    myinfo=result.rows;
                    callback();


                });

            }
        ],function(err) { //This function gets called after the two tasks have called their "task callbacks"
            if (err) return next(err); //If an error occured, we let express/connect handle it by calling the "next" function
            //Here locals will be populated with 'user' and 'posts'
            //console.log(results.service);
            res.render('pages/email', {
                user: req.user,// get the user out of session and pass to templatere
                app: app,
                myinfo:myinfo
            });
        });
    });
    app.get('/social', isLoggedIn, function(req, res) {
        var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
        var client = new pg.Client(db);
        var notif;
        client.connect();
        console.log(req.body);

        var userid=req.user.id;
        var query=client.query('SELECT * FROM public."AppointmentDetails" inner join public."users" on users."id"="AppointmentDetails"."drID" WHERE ("AppointmentDetails"."drID"=$1 OR "AppointmentDetails"."userid"=$3)  and "AppointmentDetails"."status"=$2 order by start asc', [userid,"pending",userid]);

        query.on("row", function (row, result) {
            var t=row.start;
            var t2=moment(t).format("MM/DD/YYYY");
            row.start=t2;
            var v=row.start;
            var v2=moment(v).format("hh:mm");

            var e=row.end;
            var e2=moment(e).format("hh:mm");
            row.end=e2;

            row.sttime=v2;
            result.addRow(row);


        });
        query.on("end", function (result) {

            console.log("asdasdas",req.user,"asdasda");
            client.end();
            //result=JSON.stringify(result.rows);

            res.render('pages/social', {
                user : req.user ,// get the user out of session and pass to templatere
                notif:result.rows
            });
        });


    });
    app.get('/settings', isLoggedIn, function(req, res) {
        var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
        var client = new pg.Client(db);
        var notif;
        client.connect();
        console.log(req.body);

        var userid=req.user.id;
        var query=client.query('SELECT * FROM public."AppointmentDetails" inner join public."users" on users."id"="AppointmentDetails"."drID" WHERE ("AppointmentDetails"."drID"=$1 OR "AppointmentDetails"."userid"=$3)  and "AppointmentDetails"."status"=$2 order by start asc', [userid,"pending",userid]);

        query.on("row", function (row, result) {
            var t=row.start;
            var t2=moment(t).format("MM/DD/YYYY");
            row.start=t2;
            var v=row.start;
            var v2=moment(v).format("hh:mm");

            var e=row.end;
            var e2=moment(e).format("hh:mm");
            row.end=e2;

            row.sttime=v2;
            result.addRow(row);


        });
        query.on("end", function (result) {

            console.log("asdasdas",req.user,"asdasda");
            client.end();
            //result=JSON.stringify(result.rows);

            res.render('pages/settings', {
                user : req.user ,// get the user out of session and pass to templatere
                notif:result.rows
            });
        });
    });
    app.get('/helper', isLoggedIn, function(req, res) {
        var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
        var client = new pg.Client(db);
        var notif;
        client.connect();
        console.log(req.body);

        var userid=req.user.id;
        var query=client.query('SELECT * FROM public."AppointmentDetails" inner join public."users" on users."id"="AppointmentDetails"."drID" WHERE ("AppointmentDetails"."drID"=$1 OR "AppointmentDetails"."userid"=$3)  and "AppointmentDetails"."status"=$2 order by start asc', [userid,"pending",userid]);

        query.on("row", function (row, result) {
            var t=row.start;
            var t2=moment(t).format("MM/DD/YYYY");
            row.start=t2;
            var v=row.start;
            var v2=moment(v).format("hh:mm");

            var e=row.end;
            var e2=moment(e).format("hh:mm");
            row.end=e2;

            row.sttime=v2;
            result.addRow(row);


        });
        query.on("end", function (result) {

            console.log("asdasdas",req.user,"asdasda");
            client.end();
            //result=JSON.stringify(result.rows);

            res.render('pages/helper', {
                user : req.user ,// get the user out of session and pass to templatere
                notif:result.rows
            });
        });


    });
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}