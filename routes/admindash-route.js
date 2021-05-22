var express = require('express');
var router = express.Router();
var db=require('../database');
const json2csv = require('json2csv').parse;
/* GET users listing. */
var facultyData;
var studentKaData;
var facultyCourse = [];
var result1=-1;
var result100=-1;

router.get('/admindash', function(req, res, next) {
    
    if(req.session.loggedinUser && req.session.isAdmin){
        if(req.session.isAdmin){
            var sql = "SELECT * from student";
            var numberOfStudents;
            var numberOfElectivesOpted;
            var numberOfDistinctStudents;
            var numberOfElectives;
            db.query(sql,function(err,data,fields){
                numberOfStudents = data.length;
                var sql2 = "SELECT * from studentelectives";
                db.query(sql2,function(err,result,fields){
                    numberOfElectivesOpted = result.length;
                    var sql3 = "SELECT COUNT ( DISTINCT studentId ) AS \"count\" FROM studentElectives";
                    db.query(sql3,function(err,result2,fields){
                        numberOfDistinctStudents = result2[0].count;;
                        console.log(numberOfElectives);
                        console.log(result2);
                        var sql4 = "SELECT * from electives";
                        db.query(sql4,function(err,result3){
                            numberOfElectives = result3.length;
                            // console.log(result3);
                            console.log("result100",result100);
                            var sql5 = "SELECT * FROM lastactivity WHERE typeUser = ?";
                            db.query(sql5,"admin",function(err,result4,fields){
                                // console.log("heruje : ", result4);
                                res.render('admindash',{
                                    username:req.session.username,
                                    datetimeinfo: result4,
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
                            // res.render('admindash',{
                            //     username:req.session.username,
                            //     numberOfStudents: numberOfStudents,
                            //     numberOfElectivesOpted : numberOfElectivesOpted,
                            //     numberOfDistinctStudents : numberOfDistinctStudents,
                            //     numberOfElectives : numberOfElectives,
                            });                
                        });
                        
                    });
                });
            });
        }
    }
    else {
        res.redirect('/adminlogin');
    }
});
router.post('/downloadAllStudents', function(req, res){
    var sql = "SELECT * from student";
    db.query(sql,function(err,down,fields){
        // console.log(down);
        const csvString = json2csv(down);
        res.setHeader('Content-disposition', 'attachment; filename=final.csv');
        // sleep(2000);
        res.set('Content-Type', 'text/csv');
        return res.status(200).send(csvString);
        console.log("Here");
        return res.redirect('/admindash');
    });
});
router.post("/ateacherprofile" , function(req,res,next){
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
                res.redirect("/admindash")
                // res.render("teacherprofile" , {result: status, faculty : teacherdata, courses : data1});
            });
        }
        else{
            var data1 = [];
            status = 0;
            result1=status;
            facultyData = teacherdata;
            facultyCourse = data1;
            res.redirect("/admindash")
            // res.render("teacherprofile" , {result: status, faculty : teacherdata, courses : data2});
        }
    }); 
});
router.post("/astudentprofile" , function(req,res,next){
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
            res.redirect("/admindash")
            // res.render("studentprofile" , {result: status, student : studentData});
        }
        else{
            status = 0;
            studentKaData = studentData;
            result100 = status;
            res.redirect("/admindash")
            // res.render("studentprofile", {result :status, student:data})
        }     
    }); 
});





module.exports = router;