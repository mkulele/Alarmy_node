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
                            category:req.body.boardlist,
                            verified:true
                        });

                        addlist
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "카테고리 생성 완료"
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
*/

router.get("/view", (req, res, next) => {

    List.find({verified:true})
        .exec()
        .then(List => {
            fs.writeFile(__dirname+"/../list_category.json",
                JSON.stringify(List,null,'\t'),"utf8",function (err,data) {
                fs.readFile(__dirname+"/../list_category.json", function (err, data) {
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



router.post("/delete", (req, rese, next) => {
    mongoose.connect('mongodb://admin:a123123@ds011870.mlab.com:11870/heroku_s0vvng4l',{ useNewUrlParser: true });
    var db=mongoose.connection;
    var query = {category:req.body.category};
    db.collection('lists').findOne(query, function (err, res) {
        if (err) console.log(err);
        else {
            var operator = {$set: {verified:false}};
            db.collection('lists').update(query, operator, function (err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('delete list successfully!');
                    rese.status(201).json({
                        message : 'delete list successfully'
                    });
                }
            });
        }
    });

});

module.exports = router;