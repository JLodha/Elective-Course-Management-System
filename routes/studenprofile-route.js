var express = require('express');
var router = express.Router();
var db = require("../database");
/* GET users listing. */
router.get('/studentprofile', function(req, res, next) {
    res.render("sarc");
});



module.exports = router;