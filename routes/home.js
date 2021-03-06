/**
 * Created by demetristrouthou on 26/07/2016.
 */
var express = require('express');
var pg = require('pg');
var moment=require('moment');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('pages/home', { title: 'Express' });
});

router.post('/cancel', function(req, res) {
    var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
    var client = new pg.Client(db);
    client.connect();
    console.log(req.body);

    var AppID=req.body.AppID;


    client.query('DELETE FROM public."AppointmentDetails" WHERE "AppointmentDetails"."AppID"=$1',
        [AppID],
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('row inserted: ' + result.row);
            }
            console.log('All callbacks done!');
            client.end();    // done(); is rough equivalent of client.end();
            res.send({});
        });

});
module.exports = router;