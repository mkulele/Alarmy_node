var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var bodyParser= require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var boardsRouter = require('./routes/boards');
var listsRouter = require('./routes/listss');

//mongoose.connect('mongodb://localhost:27017/alarmy', { useNewUrlParser: true });
mongoose.connect('mongodb://alarmy_admin:a123123@ds011870.mlab.com:11870/heroku_s0vvng4l', { useNewUrlParser: true });
var app = express();
mongoose.Promise = global.Promise;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});*/

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/boards',boardsRouter);
app.use('/lists',listsRouter);

module.exports = app;




