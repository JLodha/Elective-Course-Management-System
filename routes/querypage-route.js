var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../database');
var xlsx = require("xlsx");
const json2csv = require('json2csv').parse;

let items =[];
var down =[];
router.get('/querypage' , function(req,res){
    items=[];
    var sql="SELECT * from querypage";
    down=[];
    db.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log(result.length);
        data = JSON.stringify(result);
        // console.log(data);
        down = result;
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
    console.log(req.body);
    if(req.body.downloadQuery == "downloadQuery"){
    // var newWB = xlsx.utils.book_new();
    // var newWS = xlsx.utils.json_to_sheet(down);
    // xlsx.utils.book_append_sheet(newWB,newWS,"New Data");
    // xlsx.writeFile(newWB , "final.xlsx");
    const csvString = json2csv(down);
    res.setHeader('Content-disposition', 'attachment; filename=final.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvString);
    res.redirect('/querypage');
    }
    items.push(item);
    var sql = "INSERT INTO querypage (question) VALUES (?)";
    db.query(sql,item,function(err,data){
        if (err) throw err;
    });
    var msg= "Question added successfully";
    res.redirect("/querypage");
});

module.exports = router;
