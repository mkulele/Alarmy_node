var express = require('express');
var router = express.Router();
const Board = require("../models/board");
const mongoose = require("mongoose");
var http = require('http');
var url = require('url');
var querystring = require('querystring');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('get respond with a resource users');
});


router.post("/write", (req, res, next) => {
    var date = new Date();
    var year = String(date.getFullYear());
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour=date.getHours();
    var minute=date.getMinutes();
    var second=date.getSeconds();
    var timestamp = year+'-'+month+'-'+day+'/'+hour+':'+minute+':'+second;

                        const posting= new Board({
                            _id: new mongoose.Types.ObjectId(),
                            num:req.body.idx,
                            time: timestamp,
                            title:req.body.title,
                            owner:req.body.name,
                            content:req.body.text,
                            verified: true
                            //idx:req.body.idx
                        });
                        posting
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
        .then(Post => {
            res.status(201).json({
                Post
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;