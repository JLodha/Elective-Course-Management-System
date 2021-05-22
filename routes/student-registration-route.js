var express = require('express');
var router = express.Router();
var db=require('../database');

// to display registration form 
router.get('/studentregister', function(req, res, next) {
  res.render('student-registration');
});

// to store user input detail on post request
router.post('/studentregister', function(req, res, next) {
    
    inputData ={
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_address: req.body.email_address,
        gender: req.body.gender,
        password: req.body.password,
        semester : req.body.semester,
        GPA : req.body.GPA,
        rollNumber : req.body.rollNumber,
    }

    // check unique Roll Number
    var sql='SELECT * FROM student WHERE rollNumber =?';
    db.query(sql, [inputData.rollNumber] ,function (err, data, fields) {
    if(err) throw err
    if(data.length > 0){
        var msg = inputData.rollNumber+ " already exists";
    }else{ 
        var sql = 'INSERT INTO student SET ?';
        db.query(sql, inputData, function (err, data) {
            if (err) throw err;
        });
        var msg ="Your are successfully registered";
    }
    res.render('student-registration',{alertMsg:msg});
    });
});
module.exports = router;