/**
 * Created by demetristrouthou on 24/08/2016.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('pages/helper', { title: 'Express' });
});


module.exports = router;