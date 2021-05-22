var express = require('express');
var router = express.Router();
var db=require('../database');
/* GET users listing. */

var facultyData;
var studentKaData;
var facultyCourse = [];
var result1=-1;
var result100=-1;

router.get('/studentdash', function(req, res, next) {
    
    if(req.session.loggedinUser){
        var sql = "SELECT * FROM studentelectives WHERE studentId = ?";
        db.query(sql,req.session.rollNumber,function(err,data,fields){
            var sql2 = "SELECT * FROM student WHERE rollNumber = ?";
            db.query(sql2,req.session.rollNumber,function(err,kuchbhi,fields){
                console.log(kuchbhi);
                res.render('studentdash',{
                    email : req.session.rollNumber,
                    gpadata : kuchbhi[0],
                    noelectives : data.length,
                    result1 : result1,
                    result2 : result100,
                    student : studentKaData,
                    faculty : facultyData,
                    courses : facultyCourse
                });
                result1 = -1;
                result100 = -1;
            })
        })
        
    }
    else {
        res.redirect('/studentlogin');
    }
});

router.post("/cteacherprofile" , function(req,res,next){
    console.log(req.body);
    var sq = "SELECT * from registration_teacher where username = ?";
    db.query(sq, req.body.teacher , function(err, data, fields){
        if(err) throw err;
        var status;
        if(data.length > 0){
            status = 1;
            var teacherdata ={
                first_name: data[0].first_name,
                last_name: data[0].last_name,
                gender: data[0].gender,
                username : data[0].username,
            }
            var sq1 = "SELECT * from electives where faculty = ? ";
            db.query(sq1 ,req.body.teacher , function(err,data1,fields){
                if(err) throw err;
                console.log(data1);
                result1=status;
                facultyData = teacherdata;
                facultyCourse = data1;
                res.redirect("/studentdash")
                // res.render("teacherprofile" , {result: status, faculty : teacherdata, courses : data1});
            });
        }
        else{
            var data1 = [];
            status = 0;
            result1=status;
            facultyData = teacherdata;
            facultyCourse = data1;
            res.redirect("/studentdash")
            // res.render("teacherprofile" , {result: status, faculty : teacherdata, courses : data2});
        }
    }); 
});
router.post("/cstudentprofile" , function(req,res,next){
    console.log(req.body);
    var sq = "SELECT * from student where rollNumber = ?";
    db.query(sq, req.body.student , function(err, data, fields){
        if(err) throw err;
        var status;
        console.log(data);
        if(data.length > 0){
            studentData ={
                rollNumber : data[0].rollNumber,
                first_name: data[0].first_name,
                last_name: data[0].last_name,
                gender: data[0].gender,
                email_address: data[0].email_address,
                semester : data[0].semester,
                GPA : data[0].GPA,
                hostelno : data[0].hostelno,
                roomno : data[0].roomno,
                contactno : data[0].contactno,
            }
            status = 1;
            studentKaData = studentData;
            result100 = status;
            res.redirect("/studentdash")
            // res.render("studentprofile" , {result: status, student : studentData});
        }
        else{
            status = 0;
            studentKaData = studentData;
            result100 = status;
            res.redirect("/studentdash")
            // res.render("studentprofile", {result :status, student:data})
        }     
    }); 
});


module.exports = router;