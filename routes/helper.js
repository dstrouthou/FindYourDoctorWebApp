/**
 * Created by demetristrouthou on 24/08/2016.
 */
var express = require('express');
var pg = require('pg');
var async=require('async');
var moment=require('moment');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('pages/helper', { title: 'Express' });
});

router.post('/get_spec_appointments', function(req, res) {
    var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
    var doctorapp;
    var userapp;
    var mixapp;
    async.parallel([	//use of async not depented events
        function(callback) {
            var client = new pg.Client(db);
            client.connect();
            console.log(req.body);
            var specialty=req.body.specialty;
            var dfrom=req.body.dfrom;
            var dto=req.body.dto;
            var ddate=req.body.ddate;

            var query=client.query('select * from "AppointmentDetails" inner join "users" on "AppointmentDetails"."drID"="users"."id" where ("specialty"=$1 and "status"=$2)' , [specialty,"accepted"]);

            query.on("row", function (row, result) {
                row.title=row.drname;
                result.addRow(row);


            });
            query.on("end", function (result) {

                console.log(result.rows);
                client.end();
                //result=JSON.stringify(result.rows);
                doctorapp=result.rows;
                callback();
            });

        },
        function(callback) {

            var client = new pg.Client(db);
            client.connect();
            var userid=req.body.userid;

            console.log(req.body);
            var specialty=req.body.specialty;
            var dfrom=req.body.dfrom;
            var dto=req.body.dto;
            var ddate=req.body.ddate;

            var query=client.query('select * from "AppointmentDetails"  where "userid"=$1 and "category"=$2' , [userid,"private"]);

            query.on("row", function (row, result) {

                result.addRow(row);


            });
            query.on("end", function (result) {

                console.log(result.rows);
                client.end();
                //result=JSON.stringify(result.rows);
                userapp=result.rows;
                callback();
            });
        }

        ],function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err) return next(err); //If an error occured, we let express/connect handle it by calling the "next" function
        //Here locals will be populated with 'user' and 'posts'
        //console.log(results.service);

        mixapp=userapp.concat(doctorapp);
        console.log("asdadadas",mixapp,"asdadadda");
        res.send(mixapp);
    });



});
module.exports = router;