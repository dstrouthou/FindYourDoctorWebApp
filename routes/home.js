/**
 * Created by demetristrouthou on 26/07/2016.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('pages/home', { title: 'Express' });
});


module.exports = router;