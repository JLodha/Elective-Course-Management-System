var express = require('express');
var router = express.Router();
var db=require('../database');
const json2csv = require('json2csv').parse;
/* GET users listing. */

router.get('/dashboard', function(req, res, next) {
    
    if(req.session.loggedinUser && req.session.isStudent){
        res.render('dashboard',{username:req.session.rollNumber})
    }
    else if(req.session.loggedinUser)
    {
        

        // Number of students registered in system
        // Given option to download the list of students
        // Number of students who opted atleast one electives
        // Total number of electives opted so far
        res.render('dashboard',{username:req.session.username})
    }
    else {
        res.redirect('/login');
    }
});
  
module.exports = router;