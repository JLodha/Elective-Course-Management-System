var express = require('express');
var router = express.Router();
var db=require('../database');
/* GET users listing. */
router.get('/adminlogin', function(req, res, next) {
  res.render('admin-login');
});
router.post('/adminlogin', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var sql='SELECT * FROM admin WHERE username =? AND password =?';
    db.query(sql, [username, password], function (err, data, fields) {
        if(err) throw err
        if(data.length>0){
            req.session.loggedinUser= true;
            req.session.username= username;
            req.session.isStudent =false;
            req.session.isfaculty = false;
            req.session.isAdmin = true;
            // res.redirect('/admindash');

            let date_ob = new Date();
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            let hours = date_ob.getHours();
            let minutes = date_ob.getMinutes();
            let seconds = date_ob.getSeconds();
            console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
            var dte = year + "-" + month + "-" + date;
            console.log("Date Time : ", dte);
            var sql1 = 'UPDATE lastactivity SET dt = ? WHERE typeUSER = ?';
            db.query(sql1,[dte,"admin"], function(err, data,fields){
                
                time = hours + ":" + minutes + ":" + seconds;
                var sql2 = 'UPDATE lastactivity SET time = ? WHERE typeUSER = ?';
                db.query(sql2,[time,"admin"],function(err, data,fields){
                    res.redirect('/admindash');
                })
            })
        }else{
            res.render('admin-login',{alertMsg:"Your Email Address or password is wrong"});
        }
    })
})
module.exports = router;