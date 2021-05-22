var express = require('express');
var router = express.Router();
var db=require('../database');
const path = require("path");
var multer = require('multer');
var fs = require('fs');
var xlsx  = require("xlsx");
const readXlsxFile = require('read-excel-file/node');

var Fname;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      Fname = Date.now() + file.originalname;
      cb(null, Fname);
    }
});

var upload = multer({storage : storage});

let rows1=[];

router.get('/studentexcel1', function(req, res, next) {
    if(req.session.isAdmin){
        res.render('student-excel',{rows:rows1});
    }
    else{
        res.redirect("/adminlogin")
    }
});

router.post('/studentexcel1', upload.single('filename'), function(req,res,next){
    
    var fileinfo = req.file;
    let reqPath = path.join(__dirname, '../');
    reqPath = path.join(reqPath, '/uploads');
    console.log(reqPath);
    let filep = reqPath + "\\" + Fname;
    console.log(filep);
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
    localStorage.setItem("filep", filep);  
    readXlsxFile(filep).then((rows) => {
        // var sql='INSERT INTO student (rollNumber, first_name, last_name, gender,email_address,semester,GPA,password,contactno) VALUES ?';
        // console.log(rows);
        rows.shift();
        // console.log(rows.length);
        rows1=rows;
        // console.log(rows1);
        res.render("student-excel",{rows:rows1,filep:filep});
    })
    
    // console.log("Prince");
})

// router.post('/studentexcel', function(req, res){
//     console.log(req.body); 
//     if(req.body.button == "1"){
//         var filename = req.body.display;
//     }
//     for(var i=0; i < rows1.length ; i++){
//         // var sql='INSERT INTO student (rollNumber, first_name, last_name, gender,email_address,semester,GPA,password) VALUES ?';
//         var sql="INSERT INTO student SET ?";
//         inp = {
//             rollNumber : rows1[i][0],
//             first_name : rows1[i][1],
//             last_name : rows1[i][2],
//             gender : rows1[i][3],
//             email_address : rows1[i][4],
//             semester : rows1[i][5],
//             GPA : rows1[i][6],
//             password : rows1[i][7]
//         };
//         // console.log(inp);
//         db.query(sql,inp,function(err,data,fields){
//             if(err) throw err;
//         });
//     }
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
    // res.redirect("/admindash");
// })

module.exports = router;

