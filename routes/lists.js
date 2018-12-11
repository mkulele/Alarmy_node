var express = require('express');
var router = express.Router();
const List = require("../models/list");
const mongoose = require("mongoose");
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs=require('fs');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('get respond with a resource users');
});


router.post("/add", (req, res, next) => {
    var date = new Date();
    var year = String(date.getFullYear());
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour=date.getHours();
    var minute=date.getMinutes();
    var second=date.getSeconds();
    var timestamp = year+'-'+month+'-'+day+'/'+hour+':'+minute+':'+second;

                        const addlist= new List({
                            _id: new mongoose.Types.ObjectId(),
                            time: timestamp,
                            title:req.body.title,
                            verified: true

                        });
                        addlist
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "글쓰기 완료"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                });



/*
router.get("/view/:viewid", (req, res, next) => {

    var viewId = req.params.viewid;
    console.log(viewId);

    Board.find({num : viewId })
        .exec()
        .then(Post => {
            res.status(201).json({
                title:Post[0].title,
                content:Post[0].content,
                owner:Post[0].owner
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.get("/list", (req, res, next) => {

    Board.find({verified:true})
        .exec()
        .then(List => {
            fs.writeFile(__dirname+"/../list.json",
                JSON.stringify(List,null,'\t'),"utf8",function (err,data) {
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
*/
module.exports = router;