/**
 * Created by demetristrouthou on 16/07/2016.
 */
var express = require('express');
var pg = require('pg');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/calendar', { title: 'Express' });
});

router.post('/add_app', function(req, res) {
    var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
    var client = new pg.Client(db);
    client.connect();
    console.log(req.body);

    var Start=req.body.appdate;
    var End=req.body.appdatefrom;
    var Title=req.body.apptitle;
    var Name=req.body.appname;
    var Surname=req.body.appsurname;
    var userid=req.body.userid;
    var Description=req.body.description;
    var Drname=req.body.drname;
    var drID=req.body.drID;



//console.log(params[0].Start+"Start time req var"+"   "+JSON.parse(req.body.models));

    client.query('INSERT INTO public."AppointmentDetails"("title","name","surname","start","end","userid","description","drname","status","drID") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
        [Title, Name, Surname, Start, End, userid, Description, Drname, "pending",drID],
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

router.post('/update_app', function(req, res) {
    var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
    var client = new pg.Client(db);
    client.connect();
    console.log(req.body);

    var AppID=req.body.AppID;
    var Start=req.body.appdate;
    var End=req.body.appdatefrom;
    var Name=req.body.appname;
    var Surname=req.body.appsurname;
    var userid=req.body.userid;
    var Description=req.body.description;
    var Drname=req.body.drname;


//console.log(params[0].Start+"Start time req var"+"   "+JSON.parse(req.body.models));

    client.query('UPDATE public."AppointmentDetails" SET "name"=$1, "surname"=$2, "start"=$3, "end"=$4, "userid"=$5, "description"=$6, "drname"=$7 WHERE public."AppointmentDetails"."AppID"=$8',
        [Name, Surname, Start, End, userid, Description, Drname, AppID],
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


router.post('/get_appointments', function(req, res) {
    var db = process.env.DATABASE_URL||'postgres://bddbdjoivleywu:hSpS9FGO7SDt3K7nrSc1SNMl2x@ec2-54-75-243-54.eu-west-1.compute.amazonaws.com:5432/d5chkp34u741hb';
    var client = new pg.Client(db);
    client.connect();
    console.log(req.body);

    var userid=req.body.userid;
    var query=client.query('SELECT * FROM public."AppointmentDetails" WHERE (userid=$1 or "AppointmentDetails"."drID"=$3) and "AppointmentDetails"."status"= $2 ', [userid,"accepted",userid]);

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
