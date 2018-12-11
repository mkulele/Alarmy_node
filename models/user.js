const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id : { type: String, required: true },
    phone : { type: String, required: true},
    club :  { type: String, required: true},
    grade :  { type: String, required: true},
    email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    passwd: { type: String, required: true },
    name: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);