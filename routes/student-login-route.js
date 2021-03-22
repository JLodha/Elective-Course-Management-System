var express = require('express');
var router = express.Router();
var db=require('../database');
/* GET users listing. */
router.get('/studentlogin', function(req, res, next) {
  res.render('student-login');
});
router.post('/studentlogin', function(req, res){
    var emailAddress = req.body.email_address;
    var password = req.body.password;
    var sql='SELECT * FROM registration WHERE email_address =? AND password =?';
    db.query(sql, [emailAddress, password], function (err, data, fields) {
        if(err) throw err
        if(data.length>0){
            req.session.loggedinUser= true;
            req.session.emailAddress= emailAddress;
            res.redirect('/dashboard');
        }else{
            res.render('student-login',{alertMsg:"Your Email Address or password is wrong"});
        }
    })
})
module.exports = router;