var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../database');

router.get('/printexcel' , function(req,res){
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
        res.render("querypage",{newListItem: items});
    });
});

router.post("/querypage",function(req,res,next){
    item=req.body.newitem;
    // console.log(item);
    // res.render("querpage",{newListItem: item})
    items.push(item);
    var sql = "INSERT INTO querypage (question) VALUES (?)";
    db.query(sql,item,function(err,data){
        if (err) throw err;
    });
    var msg= "Question added successfully";
    res.redirect("/querypage");
});

module.exports = router;
