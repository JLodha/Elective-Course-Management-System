var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/studenteditprofile', function(req, res, next) {
  if(req.session.loggedinUser && req.session.isStudent){
    var sql = 'SELECT * FROM student where rollNumber = ?';
    var rollNumber = req.session.rollNumber;
    db.query(sql, rollNumber,function(err,data,fields){
      if(err) throw err;
      res.render('student-edit-profile', {userData:data})
    });
  }
  else
    res.render('student-login');
});

router.post('/studenteditprofile',function(req,res,next){
  var rno = req.body.rollno;
  var pwd = req.body.currpwd;
  //console.log(rno);
  var sql='SELECT * FROM student WHERE rollNumber =? AND password=?';
  db.query(sql,[rno,pwd], function (err, data, fields) {
  // var sql='SELECT * FROM student WHERE rollNumber =?';
  // db.query(sql, [rno], function (err, data, fields) {
    if(err) throw err;
    console.log(data);
    if(data.length > 0){ 
    var sql='DELETE FROM student WHERE rollNumber=?;'
    db.query(sql,req.body.rollno,function(err, data, fields){
      console.log("Length : "+ req.body.newpwd);
      if(req.body.newpwd.length ==0){
        inputData ={
          rollNumber: req.body.rollno,
          first_name: req.body.fname,
          last_name: req.body.lname,
          gender: req.body.gender,
          email_address: req.body.email,
          semester: req.body.semester,
          gpa: req.body.gpa,
          password: req.body.currpwd,
          hostelno: req.body.hno,
          roomno: req.body.rno,
          contactno: req.body.cno
        }
        var sql = 'INSERT INTO student SET ?';
        db.query(sql,inputData,function(err, fields){
          if(err) throw err;
          var msg = "Changes saved!!"
          res.redirect('/studenteditprofile');
        })
      }
      else{
        inputData ={
          rollNumber: req.body.rollno,
          first_name: req.body.fname,
          last_name: req.body.lname,
          gender: req.body.gender,
          email_address: req.body.email,
          semester: req.body.semester,
          gpa: req.body.gpa,
          password: req.body.newpwd,
          hostelno: req.body.hno,
          roomno: req.body.rno,
          contactno: req.body.cno
        }
        var sql = 'INSERT INTO student SET ?';
        db.query(sql,inputData,function(err, fields){
          if(err) throw err;
          var msg = "Changes saved!!"
          res.redirect('/studenteditprofile');
        })
      }
    })
    }
    else{
       // alert("Incorrect Password"); 
      res.redirect('/studenteditprofile');
     
    }
  })
})

module.exports = router;