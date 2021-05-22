var express = require('express');
var router = express.Router();
var db=require('../database');
const path = require("path");
var multer = require('multer');
var mysql = require('mysql');
var fs = require('fs');
var xlsx  = require("xlsx");    
const readXlsxFile = require('read-excel-file/node');
var async = require('async');
let rows1=[];

router.get('/studentexcel2', function(req, res, next) {
    if(req.session.isAdmin){
        res.render('student-excel',{rows:rows1});
    }
    else{
        res.redirect("/adminlogin")
    }
});

router.post('/studentexcel2',async (req,res,next)=> {
    console.log(req.body);
    console.log("Voted Today");
    var filep= localStorage.getItem("filep");
    console.log(filep);
    function checkUndercut(data, length){
        var Select = 'SELECT COUNT(auctions.itemId) AS cnt ';
        var From = 'From `auctions` ';
        var Where = 'WHERE auctions.itemId LIKE ? AND buyout < ?';
        var sql = Select + From + Where;
    }
    readXlsxFile(filep).then((rows) => {
        rows.shift();
        rows1=rows;
        var messages = [];
        var msg ="Your are successfully registered";
        rows2 = [];
        for(var i=0;i<rows1.length;i++){
            inputData ={
                rollNumber : rows1[i][0],
                first_name: rows1[i][1],
                last_name: rows1[i][2],
                gender: rows1[i][3],
                email_address: rows1[i][4],
                semester : rows1[i][5],
                GPA : rows1[i][6],
                password: rows1[i][7]
            };
            rows2.push(inputData);
        }
        var sql11 = 'SELECT * FROM student';
        db.query(sql11, function(err,result,fileds){
            var sql='SELECT * FROM student WHERE rollNumber = ?';
            async.forEachOf(rows2, function (dataElement, i, inner_callback){
                var inserts = [dataElement['rollNumber']];
                var ssql = mysql.format(sql, inserts);
                db.query(ssql,function(err, rows3, fields){
                    if(!err){
                        // console.log(dataElement);
                        if(rows3.length > 0){
                            msg = dataElement.rollNumber+ " already exists\n";
                            console.log(msg);
                        }else{ 
                            var sql1 = 'INSERT INTO student SET ?';
                            db.query(sql1, dataElement, function (err, data) {
                                if (err) throw err;
                                msg =dataElement.rollNumber+ " successfully registered\n";
                                // messages.push(msg);
                                console.log(msg);
                            });
                        }
                        inner_callback(null);
                    } else {
                        console.log("Error while performing Query");
                        inner_callback(err);
                    };
                });
            }, function(err){
                if(err){
                    throw err;
                }else{
                    for(var i = 0 ; i < rows2.length ; i++){ 
                        var flag = 0;
                        for(var j=0;j < result.length; j++) {
                           if(rows2[i].rollNumber == result[j].rollNumber) {
                            flag = 1;
                            msg = rows2[i].rollNumber+ " already exists\n";
                            messages.push(msg);
                           }
                        }
                        if(flag == 0){
                            msg =rows2[i].rollNumber+ " successfully registered\n";
                            messages.push(msg);
                        }
                    }
                    res.render("studentexcel3",{status : messages});
                }
            });  
        });
    })
})

module.exports = router
