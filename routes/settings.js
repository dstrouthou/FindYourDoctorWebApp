/**
 * Created by demetristrouthou on 27/07/2016.
 */
var express = require('express');
var pg = require('pg');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('pages/settings', { title: 'Express' });
});

router.post('/get_appointments_Marks', function(req, res) {
    var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
    var client = new pg.Client(db);
    client.connect();
    console.log(req.body);

    var userid=req.body.userid;
    var query=client.query('SELECT * FROM public."AppointmentDetails" WHERE drname=$1', ["Dr Mark Spencer"]);

    query.on("row", function (row, result) {

        result.addRow(row);


    });
    query.on("end", function (result) {

        console.log(result.rows);
        client.end();
        //result=JSON.stringify(result.rows);
        res.send(result.rows);
    });

});

router.post('/get_appointments_Melanie', function(req, res) {
    var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
    var client = new pg.Client(db);
    client.connect();
    console.log(req.body);

    var userid=req.body.userid;
    var query=client.query('SELECT * FROM public."AppointmentDetails" WHERE drname=$1', ["Dr Melanie You"]);

    query.on("row", function (row, result) {

        result.addRow(row);


    });
    query.on("end", function (result) {

        console.log(result.rows);
        client.end();
        //result=JSON.stringify(result.rows);
        res.send(result.rows);
    });

});

router.post('/get_appointments_Jessica', function(req, res) {
    var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
    var client = new pg.Client(db);
    client.connect();
    console.log(req.body);

    var userid=req.body.userid;
    var query=client.query('SELECT * FROM public."AppointmentDetails" WHERE drname=$1', ["Dr Jessica James"]);

    query.on("row", function (row, result) {

        result.addRow(row);


    });
    query.on("end", function (result) {

        console.log(result.rows);
        client.end();
        //result=JSON.stringify(result.rows);
        res.send(result.rows);
    });

});

router.post('/get_appointments_Maria', function(req, res) {
    var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
    var client = new pg.Client(db);
    client.connect();
    console.log(req.body);

    var userid=req.body.userid;
    var query=client.query('SELECT * FROM public."AppointmentDetails" WHERE drname=$1', ["Dr Maria Game"]);

    query.on("row", function (row, result) {

        result.addRow(row);


    });
    query.on("end", function (result) {

        console.log(result.rows);
        client.end();
        //result=JSON.stringify(result.rows);
        res.send(result.rows);
    });

});

router.post('/get_appointments_Daniel', function(req, res) {
    var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
    var client = new pg.Client(db);
    client.connect();
    console.log(req.body);

    var userid=req.body.userid;
    var query=client.query('SELECT * FROM public."AppointmentDetails" WHERE drname=$1', ["Dr Daniel Eight"]);

    query.on("row", function (row, result) {

        result.addRow(row);


    });
    query.on("end", function (result) {

        console.log(result.rows);
        client.end();
        //result=JSON.stringify(result.rows);
        res.send(result.rows);
    });

});

router.post('/get_appointments_David', function(req, res) {
    var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
    var client = new pg.Client(db);
    client.connect();
    console.log(req.body);

    var userid=req.body.userid;
    var query=client.query('SELECT * FROM public."AppointmentDetails" WHERE drname=$1', ["Dr David Sharp"]);

    query.on("row", function (row, result) {

        result.addRow(row);


    });
    query.on("end", function (result) {

        console.log(result.rows);
        client.end();
        //result=JSON.stringify(result.rows);
        res.send(result.rows);
    });

});

router.post('/get_appointments_Bryan', function(req, res) {
    var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
    var client = new pg.Client(db);
    client.connect();
    console.log(req.body);

    var userid=req.body.userid;
    var query=client.query('SELECT * FROM public."AppointmentDetails" WHERE drname=$1', ["Dr Bryan Dier"]);

    query.on("row", function (row, result) {

        result.addRow(row);


    });
    query.on("end", function (result) {

        console.log(result.rows);
        client.end();
        //result=JSON.stringify(result.rows);
        res.send(result.rows);
    });

});

router.post('/get_appointments_Drake', function(req, res) {
    var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
    var client = new pg.Client(db);
    client.connect();
    console.log(req.body);

    var userid=req.body.userid;
    var query=client.query('SELECT * FROM public."AppointmentDetails" WHERE drname=$1', ["Dr Drake Brown"]);

    query.on("row", function (row, result) {

        result.addRow(row);


    });
    query.on("end", function (result) {

        console.log(result.rows);
        client.end();
        //result=JSON.stringify(result.rows);
        res.send(result.rows);
    });

});

router.post('/get_appointments_Emily', function(req, res) {
    var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
    var client = new pg.Client(db);
    client.connect();
    console.log(req.body);

    var userid=req.body.userid;
    var query=client.query('SELECT * FROM public."AppointmentDetails" WHERE drname=$1', ["Dr Emily Dooke"]);

    query.on("row", function (row, result) {

        result.addRow(row);


    });
    query.on("end", function (result) {

        console.log(result.rows);
        client.end();
        //result=JSON.stringify(result.rows);
        res.send(result.rows);
    });

});

module.exports = router;