/**
 * Created by demetristrouthou on 24/08/2016.
 */
var express = require('express');
var pg = require('pg');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('pages/helper', { title: 'Express' });
});

router.post('/get_spec_appointments', function(req, res) {
    var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
    var client = new pg.Client(db);
    client.connect();
    console.log(req.body);
    var specialty=req.body.specialty;
    var dfrom=req.body.dfrom;
    var dto=req.body.dto;
    var ddate=req.body.ddate;

    var query=client.query('select * from "AppointmentDetails" inner join "users" on "AppointmentDetails"."drID"="users"."id" where "specialty"=$1 and "status"=$2', [specialty,"accepted"]);

    query.on("row", function (row, result) {
        row.title=row.drname;
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