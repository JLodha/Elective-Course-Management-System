var express = require('express');
var router = express.Router();
var db=require('../database');
/* GET users listing. */
router.get('/teacherlogin', function(req, res, next) {
  res.render('teacher-login');
});
router.post('/teacherlogin', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var sql='SELECT * FROM registration_teacher WHERE username =? AND password =?';
    db.query(sql, [username, password], function (err, data, fields) {
        if(err) throw err
        if(data.length>0){
            req.session.loggedinUser= true;
            req.session.username= username;
            req.session.isStudent = false;
            req.session.isfaculty = true;
            req.session.isAdmin = false;
            res.redirect('/teacherdash');
        }else{
            res.render('teacher-login',{alertMsg:"Your Email Address or password is wrong"});
        }
    })
})
module.exports = router;
