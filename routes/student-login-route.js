var express = require('express');
var router = express.Router();
var db=require('../database');
const readXlsxFile = require('read-excel-file/node');
/* GET users listing. */
router.get('/studentlogin', function(req, res, next) {
    let filep = __dirname + '\\g.xlsx';
    readXlsxFile(filep).then((rows) => {
        var sql='INSERT INTO student (rollNumber, first_name, last_name, gender,email_address,semester,GPA,password,contactno) VALUES ?';
        rows.shift();
        console.log(rows.length);
        // `rows` is an array of rows
        // each row being an array of cells.
      })
  res.render('student-login');
});
router.post('/studentlogin', function(req, res){
    var rollNumber = req.body.rollNumber;
    // var emailAddress = req.body.emailAddress;
    var password = req.body.password;
    var sql='SELECT * FROM student WHERE rollNumber =? AND password =?';
    db.query(sql, [rollNumber, password], function (err, data, fields) {
        if(err) throw err
        if(data.length>0){
            req.session.loggedinUser= true;
            // req.session.emailAddress= emailAddress;
            req.session.rollNumber = rollNumber;     
            req.session.isStudent = true;
            req.session.isfaculty = false;
            req.session.isAdmin = false;
            res.redirect('/studentdash');
        }else{
            res.render('student-login',{alertMsg:"Your Email Address or password is wrong"});
        }
    })
})

module.exports = router;

