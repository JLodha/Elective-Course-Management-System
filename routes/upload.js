var express = require('express');
var router = express.Router();
var db=require('../database');
// const readXlsxFile = require('read-excel-file/node');
var xlsx  = require("xlsx");
/* GET users listing. */
let rows1=[];

router.get('/upload', function(req, res, next) {
    if(req.session.isAdmin){
    // let filep = __dirname + '\\studdetail.xlsx';
    // readXlsxFile(filep).then((rows) => {
    //     // var sql='INSERT INTO student (rollNumber, first_name, last_name, gender,email_address,semester,GPA,password,contactno) VALUES ?';
    //     rows.shift();
    //     console.log(rows.length);
    //     rows1=rows;
        res.render('student-excel',{rows:rows1});
    //     // `rows` is an array of rows
    //     // each row being an array of cells.
    //   })
    }
    else{
        res.redirect("/adminlogin")
    }
});

router.post('/studentexcel', function(req, res){
    console.log(req.body); 
    if(req.body.button == "1"){
        var filename = req.body.display;
    }
    for(var i=0; i < rows1.length ; i++){
        // var sql='INSERT INTO student (rollNumber, first_name, last_name, gender,email_address,semester,GPA,password) VALUES ?';
        var sql="INSERT INTO student SET ?";
        inp = {
            rollNumber : rows1[i][0],
            first_name : rows1[i][1],
            last_name : rows1[i][2],
            gender : rows1[i][3],
            email_address : rows1[i][4],
            semester : rows1[i][5],
            GPA : rows1[i][6],
            password : rows1[i][7]
        };
        // console.log(inp);
        db.query(sql,inp,function(err,data,fields){
            if(err) throw err;
        });
    }
    // var rollNumber = req.body.rollNumber;
    // // var emailAddress = req.body.emailAddress;
    // var password = req.body.password;
    // var sql='SELECT * FROM student WHERE rollNumber =? AND password =?';
    // db.query(sql, [rollNumber, password], function (err, data, fields) {
    //     if(err) throw err
    //     if(data.length>0){
    //         req.session.loggedinUser= true;
    //         // req.session.emailAddress= emailAddress;
    //         req.session.rollNumber = rollNumber;     
    //         req.session.isStudent = true;
    //         req.session.isfaculty = false;
    //         req.session.isAdmin = false;
    //         res.redirect('/dashboard');
    //     }else{
    //         res.render('student-login',{alertMsg:"Your Email Address or password is wrong"});
    //     }
    // })
    res.redirect("/admindash");
})

module.exports = router;

