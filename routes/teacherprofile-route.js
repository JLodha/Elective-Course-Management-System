var express = require('express');
var router = express.Router();
var db = require("../database");
/* GET users listing. */
router.get('/teacherprofile', function(req, res, next) {
    var status = -1;
    var data2=[];
    var teacherdata;
    console.log("Here");
    res.render("teacherprofile" , {result: status, faculty : teacherdata, courses : data2});
});

router.post("/teacherprofile" , function(req,res,next){
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
                res.render("teacherprofile" , {result: status, faculty : teacherdata, courses : data1});
            });
        }
        else{
            status = 0;
            var data2=[];
            var teacherdata;
            res.render("teacherprofile" , {result: status, faculty : teacherdata, courses : data2});
        }
    }); 
});

module.exports = router;