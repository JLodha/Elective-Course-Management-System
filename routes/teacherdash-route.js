var express = require('express');
var router = express.Router();
var db = require("../database");
/* GET users listing. */

var facultyData;
var studentKaData;
var facultyCourse = [];
var result1=-1;
var result100=-1;

router.get('/teacherdash', function(req, res, next) {
    
    if(req.session.loggedinUser && req.session.isfaculty){
        var sql = "SELECT * from student";
        var numberOfStudents;
        var numberOfElectivesOpted;
        var numberOfDistinctStudents;
        var numberOfElectives;
        var facultyId = req.session.username;
        db.query(sql,function(err,data,fields){
            numberOfStudents = data.length;
            var sql2 ="SELECT * from electives where faculty = ?";
            db.query(sql2,facultyId, function(err,result,fields){
                numberOfElectives = result.length;
                var sql3 = "SELECT * FROM electives INNER JOIN studentelectives ON electives.courseCode=studentelectives.courseCode where electives.faculty = ?";
                db.query(sql3,facultyId, function(err,result2,fields){
                    numberOfElectivesOpted = result2.length;
                    var mp = new Map();
                    for(var i =0 ;i < result2.length ; ++i){
                        mp.set(result2[i].studentId,"1"); 
                    }
                    console.log(mp.size);
                    numberOfDistinctStudents = mp.size;
                    console.log(result2);
                    res.render('teacherdash',{
                        username:req.session.username,
                        numberOfStudents: numberOfStudents,
                        numberOfElectivesOpted : numberOfElectivesOpted,
                        numberOfDistinctStudents : numberOfDistinctStudents,
                        numberOfElectives : numberOfElectives,
                        result1 : result1,
                        result2 : result100,
                        student : studentKaData,
                        faculty : facultyData,
                        courses : facultyCourse
                    }); 
                    result1 = -1;
                    result100 = -1;               
                });
            });
        });
    }
    else {
        res.redirect('/teacherlogin');
    }
});


router.post("/bteacherprofile" , function(req,res,next){
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
                res.redirect("/teacherdash")
                // res.render("teacherprofile" , {result: status, faculty : teacherdata, courses : data1});
            });
        }
        else{
            var data1 = [];
            status = 0;
            result1=status;
            facultyData = teacherdata;
            facultyCourse = data1;
            res.redirect("/teacherdash")
            // res.render("teacherprofile" , {result: status, faculty : teacherdata, courses : data2});
        }
    }); 
});
router.post("/bstudentprofile" , function(req,res,next){
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
            res.redirect("/teacherdash")
            // res.render("studentprofile" , {result: status, student : studentData});
        }
        else{
            status = 0;
            studentKaData = studentData;
            result100 = status;
            res.redirect("/teacherdash")
            // res.render("studentprofile", {result :status, student:data})
        }     
    }); 
});



module.exports = router;