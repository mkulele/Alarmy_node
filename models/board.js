const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    num : { type: String, required: true },//고유번호
    time:{ type: String, required: true },//작성시간
    owner: { type: String, required: true },//작성자
    ownerid:{type:String,required:true},//작성자id
    title:{ type: String, required: true },//제목
    content:{ type: String, required: true },//내용
    category:{type:String,required:true},//카테고리
    verified:{ type: Boolean, required: true }

});

module.exports = mongoose.model('Board', boardSchema);