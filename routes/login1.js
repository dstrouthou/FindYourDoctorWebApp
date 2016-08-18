/**
 * Created by demetristrouthou on 28/07/2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/login1', { title: 'Express' });
});



module.exports = router;