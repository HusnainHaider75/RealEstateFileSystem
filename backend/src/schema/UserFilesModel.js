const mongoose = require('mongoose');
const DataModel = mongoose.Schema({
    RegistrationNo: String,
    IntinitationLetterSerial: String,
    BookingFormSerial: String,
    CreatedBy : String,
    Status: Boolean,
    Detail: String
});
const DataSample =mongoose.model('UserFiles', DataModel);
module.exports =DataSample;