var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../database');
var db1 = require('../database');

let items =[];
let myform = undefined;
router.get('/querypageadmin' , function(req,res){
    items=[];
    var sql="SELECT * from querypage";
    db.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log(result.length);
        for(var i=0 ; i < result.length ; i++){
            items.push(result[i]);
            // console.log(items);
        }
        console.log(items);
        res.render("querypageadmin",{newListItem: items});
    });
});

router.post("/querypageadmin",function(req,res,next){
    item=req.body;
    console.log(item);
    // for(const it in item){
    //     console.log(it);
    //     console.log(item[it]);
    // }
    // res.render("querpage",{newListItem: item})
    // items.push(item);
    // var sql = "INSERT INTO querypage (question) VALUES (?)";
    // db.query(sql,item,function(err,data){
    //     if (err) throw err;
    // });
    // var msg= "Question added successfully";
    var sql="SELECT * from querypage";
    db.query(sql,function(err,result,fields){
        var si=result.length;
        var cnt=0;
        if(err) throw err;
        for(const it in item){
            // console.log(it);
            if(cnt>=si){
                continue;
            }
            // console.log(items[it]);
            var qur="UPDATE querypage SET answer=(?) WHERE quesid = (?) ";
            db1.query(qur,[item[it],it],function(err,res,fi){
                if(err) throw err;
            });
            cnt++;
        }
    });
    res.redirect("/querypageadmin");
});

module.exports = router;