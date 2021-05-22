var express = require('express');
var router = express.Router();
var db = require("../database");
/* GET users listing. */
router.get('/studentprofile', function(req, res, next) {
    var status = -1;
    var data;
    console.log("Here");
    res.render("studentprofile", {result :status, student:data})
});

router.post("/studentprofile" , function(req,res,next){
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
            res.render("studentprofile" , {result: status, student : studentData});
        }
        else{
            status = 0;
            res.render("studentprofile", {result :status, student:data})
        }     
    }); 
});

module.exports = router;