var express = require('express');
var router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.rout
  res.send('get respond with a resource boards');

});


router.post("/", (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "이미 존재하는 이메일입니다."
                });
            } else {
                bcrypt.hash(req.body.passwd, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            id:req.body.id,
                            name:req.body.name,
                            phone:req.body.phone,
                            club:req.body.club,
                            grade:req.body.grade,
                            email: req.body.email,
                            passwd: hash,
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "계정 생성"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
});





router.post("/login", (req, res, next) => {
    User.find({ id: req.body.id })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "아이디와 비밀번호를 확인해주세요."
                });
            }
            bcrypt.compare(req.body.passwd, user[0].passwd, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "아이디와 비밀번호를 확인해주세요."
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            id: user[0].id,
                            userId: user[0]._id
                        },
                        'secret',
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "HELLO :)",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "로그인 실패"
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





/*router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    if (id === 'tashfik') {
        res.status(200).json({
            message: 'You Logged In.',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'Wrong credentials.'
        });
    }
});

router.patch('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated Id!'
    });
});

router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted id!'
    });
});
*/



module.exports = router;
