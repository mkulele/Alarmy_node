const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title : { type: String, required: true },//과목명
    time:{ type: String, required: true },//만들어진 시간
    verified:{ type: Boolean, required: true }
});

module.exports = mongoose.model('List', listSchema);