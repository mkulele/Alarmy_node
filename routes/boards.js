var express = require('express');
var router = express.Router();
const Board = require("../models/board");
const mongoose = require("mongoose");
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs=require('fs');
//var idxdburl = "mongodb://localhost:27017";


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('get respond with a resource users');
});


router.post("/write", (req, rese, next) => {
    mongoose.connect('mongodb://admin:a123123@ds011870.mlab.com:11870/heroku_s0vvng4l',{ useNewUrlParser: true });
          var db=mongoose.connection;
           var query = {idx_title: 'boardidx'};
           db.collection('idx').findOne(query, function (err, res) {
               if (err) console.log(err);
               else {
                   var boardidx = req.text;

                   var operator = {$set: {idx_num: boardidx}};

                   db.collection('idx').update(query, operator, function (err, docs) {
                       if (err) {
                           console.log(err);
                       } else {
                           console.log('updated successfully!');
                       }
                       var date = new Date();
                       var year = String(date.getFullYear());
                       var month = date.getMonth() + 1;
                       var day = date.getDate();
                       var hour = date.getHours();
                       var minute = date.getMinutes();
                       var second = date.getSeconds();
                       var timestamp = year + '-' + month + '-' + day + '/' + hour + ':' + minute + ':' + second;


                       const posting = new Board({
                           _id: new mongoose.Types.ObjectId(),
                           num: boardidx,
                           time: timestamp,
                           title: req.body.title,
                           owner: req.body.name,
                           ownerid: req.body.ownerid,
                           content: req.body.text,
                           category: req.body.category,
                           verified: true
                       });

                       posting
                           .save()
                           .then(result => {
                               console.log(result);
                               rese.status(201).json({
                                   idx: boardidx
                               });
                           })

                   });
               }
           });

    });





router.get("/view/:viewid", (req, res, next) => {

    var viewId = req.params.viewid;
    console.log(viewId);

    Board.find({num : viewId })
        .exec()
        .then(Post => {
            res.status(201).json({
                title:Post[0].title,
                content:Post[0].content,
                owner:Post[0].owner,
                ownerid:Post[0].ownerid,
                category:Post[0].category
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.get("/list/:cg", (req, res, next) => {
    var cg = req.params.cg;

    Board.find({verified:true, category:cg})
        .exec()
        .then(List => {
            fs.writeFile(__dirname+"/../list.json",
                JSON.stringify(List,null,'\t'),"utf8",function (error, jdata) {
                fs.readFile(__dirname+"/../list.json", function (err, data) {
                        var listjson = JSON.parse(data);
                        console.log('data:' + listjson);
                    res.status(201).json(
                        listjson
                    );
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



router.post("/edit", (req, rese, next) => {
    mongoose.connect('mongodb://admin:a123123@ds011870.mlab.com:11870/heroku_s0vvng4l',{ useNewUrlParser: true });
    var db=mongoose.connection;
    var query = {num:req.params.idx};
    var editcontent = req.params.text;
    db.collection('boards').findOne(query, function (err, res) {
        if (err) console.log(err);
        else {
            var operator = {$set: {content:editcontent}};
            db.collection('boards').update(query, operator, function (err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('edit successfully!');
                    rese.status(201).json({
                        message : 'edit successfully'
                    });
                }
            });
        }
    });

});

module.exports = router;