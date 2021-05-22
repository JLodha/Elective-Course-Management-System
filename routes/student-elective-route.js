var express = require('express');
var router = express.Router();
var db=require('../database');
/* GET users listing. */

var result1=[];
router.get('/studentelective', function(req, res, next) {
  result1=[];
  previousItems=[];
  var sql='SELECT * FROM electives WHERE semester = ? AND password =?';
    let rollNumber=req.session.rollNumber;
    if(req.session.loggedinUser){
      var sql = "SELECT semester FROM student WHERE rollNumber = ?";
      db.query(sql,rollNumber, function(err,data,fields){
        if(err) throw err;
        var sql1 = "SELECT * FROM electives WHERE semester = ?";
        db.query(sql1,Number(data[0].semester), function(err,result,fields){
          if(err) throw err;
          result1=result;
          var sql2="SELECT courseCode from studentElectives where studentId = ?";
          db.query(sql2,rollNumber,function(err,selectedCourse, fields){
            if(err) throw err;
            for(var i = 0;i<selectedCourse.length ; i++){
              for(var j=0;j<result.length;j++) {
                if(selectedCourse[i].courseCode==result[j].courseCode)
                  previousItems.push(result[j]);
              }
            }
            var sql3="SELECT GPA from student where rollNumber = ? ";
            db.query(sql3,rollNumber,function(err,yourGPA,fields){
              if(err) throw err;
              console.log(yourGPA);
              console.log(result);
              console.log(previousItems);
              res.render('student-elective',{  
                itemList : result,
                previousSelection : previousItems,
                yourGPA: yourGPA[0].GPA,
              });
            });
            
          });
        });
      });
    }
    else {
      res.redirect('/studentlogin');
    }
});

router.post('/studentelective', function(req, res, next) {
    
  let selectedBoxes  = req.body.ckb;
  let rollNumber=req.session.rollNumber;
  var sql1= "DELETE FROM studentElectives Where StudentId = ?";
  db.query(sql1,rollNumber, function(err,data,fields){
    if(err) throw err;
  });
  for(var i=0; i<selectedBoxes.length; i++){
    var course = result1[Number(selectedBoxes[i])];
    var sql = "INSERT INTO studentElectives (studentId, courseCode) VALUES (?, ?)";
    db.query(sql,[rollNumber,course.courseCode], function(err,data,fields){
      if(err) throw err;
    });
  }
  res.redirect('/studentelective');
});
module.exports = router;