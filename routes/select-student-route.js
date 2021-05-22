var express = require('express');
var router = express.Router();
var db=require('../database');
const json2csv = require('json2csv').parse;

/* GET users listing. */
var copyItemList =[];
var copyStudentList = [];
var itemList = [];
var prevItemList = [];
var studentList = [];
var prevStudentList = [];

router.get('/selectstudent', function(req, res, next) {
  if(req.session.loggedinUser)
  { 
    if(req.session.isfaculty)
    {
      itemList = [];
      prevItemList = [];
      studentList = [];
      prevStudentList = [];
      var facultyId = req.session.username;
      var sql="SELECT * from electives where faculty = ?";
      db.query(sql,facultyId, function(err,data,fields){
        if(err) throw err;
        var sql1 = "SELECT * FROM electives INNER JOIN studentelectives ON electives.courseCode=studentelectives.courseCode where electives.faculty = ?";
        db.query(sql1,facultyId, function(err,result,fields){
          if(err) throw err;
          var tempList=[];
          var sql2="SELECT * from student";
          db.query(sql2,function(err,listStudent,fields){
            if(err) throw err;
            var sql3 = "SELECT * FROM electives INNER JOIN courseselection ON  electives.courseCode=courseselection.courseCode where electives.faculty = ?";
            db.query(sql3,facultyId, function(err,prevResult,fields){
              if(err) throw err;
              for(var i=0;i<data.length;i++){
                tempList=[];
                for(var j=0;j<prevResult.length;j++){
                  if(data[i].courseCode == prevResult[j].courseCode)
                  {
                      for(var k=0; k<listStudent.length;k++){
                        if(prevResult[j].studentId == listStudent[k].rollNumber) {
                          // console.log("My fav students");
                          tempList.push(listStudent[k]);
                        }
                      }
                  }
                }
                prevItemList.push(data[i]);
                prevStudentList.push(tempList);
              }
              for (var i=0;i<data.length;i++){
                tempList = [];
                for(var j=0;j<result.length;j++){
                  if(data[i].courseCode == result[j].courseCode)
                  {
                      // console.log("Inside the loop using j");
                      for(var k=0; k<listStudent.length;k++){
                        if(result[j].studentId == listStudent[k].rollNumber) {
                          // console.log("My fav students");
                          tempList.push(listStudent[k]);
                        }
                      }
                  }
                }
                // console.log(tempList);
                itemList.push(data[i]);
                studentList.push(tempList);
              }
              // console.log(itemList);
              copyItemList = itemList;
              copyStudentList = studentList;
              console.log("Student List : ",studentList);
              res.render('select-student',{
                itemList : itemList,
                studentList : studentList,
                prevItemList : prevItemList,
                prevStudentList : prevStudentList,
                status : "teacher"
              });
           });
          });
        });
      });
    }
    else if(req.session.isAdmin){
      itemList = [];
      prevItemList = [];
      studentList = [];
      prevStudentList = [];
      var sql="SELECT * from electives";
      db.query(sql, function(err,data,fields){
        if(err) throw err;
        var sql1 = "SELECT * FROM electives INNER JOIN studentelectives ON electives.courseCode=studentelectives.courseCode";
        db.query(sql1, function(err,result,fields){
          if(err) throw err;
          var tempList=[];
          var sql2="SELECT * from student";
          db.query(sql2,function(err,listStudent,fields){
            if(err) throw err;
            var sql3 = "SELECT * FROM electives INNER JOIN courseselection ON  electives.courseCode=courseselection.courseCode";
            db.query(sql3, function(err,prevResult,fields){
              if(err) throw err;
              for(var i=0;i<data.length;i++){
                tempList=[];
                for(var j=0;j<prevResult.length;j++){
                  if(data[i].courseCode == prevResult[j].courseCode)
                  {
                      for(var k=0; k<listStudent.length;k++){
                        if(prevResult[j].studentId == listStudent[k].rollNumber) {
                          // console.log("My fav students");
                          tempList.push(listStudent[k]);
                        }
                      }
                  }
                }
                prevItemList.push(data[i]);
                prevStudentList.push(tempList);
              }
              for (var i=0;i<data.length;i++){
                tempList = [];
                for(var j=0;j<result.length;j++){
                  if(data[i].courseCode == result[j].courseCode)
                  {
                      // console.log("Inside the loop using j");
                      for(var k=0; k<listStudent.length;k++){
                        if(result[j].studentId == listStudent[k].rollNumber) {
                          // console.log("My fav students");
                          tempList.push(listStudent[k]);
                        }
                      }
                  }
                }
                // console.log(tempList);
                itemList.push(data[i]);
                studentList.push(tempList);
              }
              // console.log(itemList);
              copyItemList = itemList;
              copyStudentList = studentList;
              console.log("Student List : ",studentList);
              res.render('select-student',{
                itemList : itemList,
                studentList : studentList,
                prevItemList : prevItemList,
                prevStudentList : prevStudentList,
                status : "admin"
              });
           });
          });
        });
      });
    }
    else{
      res.redirect('/');
    }
  }
  else
  {
    res.redirect('/');
    // res.render('teacher-login');
  }
});

router.post('/selectstudent', function(req, res){
    
    console.log(req.body);
    var courseIndex = Number(req.body.courseIndex);
    var course = copyItemList[courseIndex];
    var sql = "DELETE from courseSelection where courseCode = ?";
    var sql1 = "INSERT INTO courseSelection (courseCode, StudentId) VALUES (?, ?)";
    db.query(sql,course.courseCode,function(err,Ddata,fields){
      if(err) throw err;
      for(var i= 0;i<req.body.chk.length;i++){
        let studentIndex = Number(req.body.chk[i]);
        var rollNumber = copyStudentList[courseIndex][studentIndex].rollNumber;
        db.query(sql1,[course.courseCode, rollNumber],function(err,result,fields){
          if(err) throw err;
        });
      }
      res.redirect('/selectstudent');
    });
})

router.post('/downloadStudents', function(req, res){
  console.log("Hi :)");
  console.log("Body downloadstudents : ",req.body);
  var down=[];
  var idx = (req.body.dwnld);
  console.log("IDX : ",idx);
  for(var i=0;i<prevStudentList[idx].length;i++){
    down.push(prevStudentList[idx][i]);
  }
  console.log("Prev Students : ", prevStudentList);
  console.log(down);
  const csvString = json2csv(down);
  res.setHeader('Content-disposition', 'attachment; filename=final.csv');
  res.set('Content-Type', 'text/csv');
  return res.status(200).send(csvString);
  // res.redirect('/selectstudent');
});

router.post('/downloadAppliedStudents', function(req, res){
  console.log(req.body);
  var down=[];
  var idx = Number(req.body.dwnld);
  console.log("IDX : ",idx);
  for(var i=0;i<studentList[idx].length;i++){
    down.push(studentList[idx][i]);
  }
  console.log("List : ", studentList);
  console.log("DOWN : ", down);
  const csvString = json2csv(down);
  res.setHeader('Content-disposition', 'attachment; filename=final.csv');
  res.set('Content-Type', 'text/csv');
  return res.status(200).send(csvString);
  res.redirect('/selectstudent');
});
module.exports = router;