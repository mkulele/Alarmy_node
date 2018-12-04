var express = require('express');
var router = express.Router();
const Board = require("../models/board");
const mongoose = require("mongoose");
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
                            num:timestamp,
                            time: timestamp,
                            title:req.body.title,
                            owner:req.body.name,
                            content:req.body.text
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




router.post("/view", (req, res, next) => {
    Board.find({title : req.body.title })
        .exec()
        .then(Post => {
             res.status(201).json({
                title:Post(title),
                content:Post(content)
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