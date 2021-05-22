var express = require('express');
var router = express.Router();
var db=require('../database');
const readXlsxFile = require('read-excel-file/node');
/* GET users listing. */
let rows1=[];
router.get('/studentexcel', function(req, res, next) {
    if(req.session.isAdmin){
        res.render('studex');
    }
    else{
        res.redirect("/adminlogin")
    }
});

router.post('/studentexcel', function(req, res){
    
    res.redirect("/admindash");
})

module.exports = router;

