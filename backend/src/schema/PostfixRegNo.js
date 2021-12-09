const mongoose = require('mongoose');
const DataModel = mongoose.Schema({
    _id:{
        type: String,
        default: "UserID"
    },
    SeqNo:{
        type: Number,
        default: 0
    }
});
const DataSample =mongoose.model('PostfixRegNo', DataModel);
module.exports =DataSample;