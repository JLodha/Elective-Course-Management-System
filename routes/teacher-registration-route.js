var express = require('express');
var router = express.Router();
var db=require('../database');
// to display registration form 
router.get('/registerteacher', function(req, res, next) {
  res.render('teacher-registration');
});
// to store user input detail on post request
router.post('/registerteacher', function(req, res, next) {
    
    inputData ={
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        gender: req.body.gender,
        password: req.body.password,
    }
// check unique email address
var sql='SELECT * FROM registration_teacher WHERE username =?';
db.query(sql, [inputData.username] ,function (err, data, fields) {
 if(err) throw err
 if(data.length>1){
     var msg = inputData.email_address+ "was already exist";
//  }else if(inputData.confirm_password != inputData.password){
//     var msg ="Password & Confirm Password is not Matched";
}else{
     
    // save users data into database
    var sql = 'INSERT INTO registration_teacher SET ?';
   db.query(sql, inputData, function (err, data) {
      if (err) throw err;
           });
  var msg ="Your are successfully registered";
 }
 res.render('teacher-registration',{alertMsg:msg});
})
     
});
module.exports = router;