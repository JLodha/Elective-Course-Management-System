var express = require('express');
var router = express.Router();
var db=require('../database');
/* GET users listing. */
router.get('/teacheraddelective', function(req, res, next) {
    var sql = 'SELECT * FROM electives';
    db.query(sql, function(err,data,fields){
        if(err) throw err;
        res.render('teacher-addelective', {userData:data})
    })
});

// router.post('/admin-elective-change',  function(req, res){
//     var sql = 'SELECT * FROM electives';
//     db.query(sql, function(err,result){
//         console.log("Total table rows : "+ result.length );
//         var sql1 = 'TRUNCATE TABLE electives';
//         db.query(sql1, function(err1,result1){
//             var fa = [];
//             var li = req.body;
//             for(var i =0; i<result.length; i++){
//                 console.log("Iterating over row no : " + i);
//                 pushDBMS(i);
//             }
//             function pushDBMS(x){
//                 if(li['courseId'][x]=="")
//                 return;

//                 var arr = [];
//                 arr.push(li['courseId'][x]);
//                 arr.push(li['courseName'][x]);
//                 arr.push(li['courseCode'][x]);
//                 arr.push(li['semester'][x]);
//                 arr.push(li['faculty'][x]);
//                 arr.push(li['minGPA'][x]);

//                 fa.push(arr);
//             }
//             console.log("Items : " + fa);
//             if(fa.length == 0){
//                 res.redirect('adminelective');
//             }
//             else{
//                 var sql2 = 'INSERT INTO electives (`courseId`, `courseName`, `courseCode`, `semester`, `faculty`, `minGPA`) VALUES ?';
//                 db.query(sql2,[fa],function(err2,result2){
//                     if(err2) throw err2;
//                     res.redirect('adminelective');
//                 })
//             } 
//         })
//     })   
// });
router.post('/teacher-elective-add', function(req,res){
    inputData = {
        courseId: req.body.addcourseId,
        courseName: req.body.addcourseName,
        courseCode: req.body.addcourseCode,
        semester: req.body.addsemester,
        faculty: req.body.addFaculty,
        minGPA: req.body.addminGPA
    }
    console.log("Filled Data : " + inputData);
    var sql = 'INSERT INTO electives SET ?';
    db.query(sql,inputData,function(err,result){
        if(err) throw err;
        res.redirect('teacheraddelective');
    })
});
module.exports = router;