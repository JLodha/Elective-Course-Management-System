var express = require('express');
var router = express.Router();
var db=require('../database');
var bodyParser = require('body-parser');

/* GET users listing. */
router.get('/teacher-elective', function(req,res,next) {
    var sql = 'SELECT * FROM registration,elective';
    db.query(sql,function(err,data,fields){
        if(err) throw err;
        res.render('teacher-elective', {title: 'Teacher Elective Table - Detail', userData : data});
    });
    /*var sql = 'SELECT * FROM elective';
    db.query(sql, function(err,data,fields){
        if(err) throw err;
        res.render('teacher-elective', {title: 'Teacher Elective Table - Elective Name', electiveData : data});
    });*/
});

/*router.post('/teacherelective', function(req,res){
    var json = JSON.stringify(req.body);
    var values = [];
    for(var i=1; i< json.length; i++)
        values.push(json.data[i]);
        db.query('INSERT INTO result (a,b,c,d,e) VALUES ?', [values], function(err,result){
            if(err) {
                res.render('teacher-elective',{alertMsg:"ERROR!"});
             }
            else {
                res.render('teacher-elective',{alertMsg:"SUCCESS!"});
             }
        });
})*/
router.post('/teacher-elective', function(req, res) {
        var table = req.body.XT;
        console.log(table);

        /*var sql = 'INSERT INTO result (a,b,c,d,e) VALUES ' + values ;
        db.query(sql, function(err,result){
            if(err) {
                res.render('/teacher-elective',{alertMsg:"ERROR!"});
             }
            else {
                res.render('/teacher-elective',{alertMsg:"SUCCESS!"});
             }
        });*/
  });
module.exports = router;
