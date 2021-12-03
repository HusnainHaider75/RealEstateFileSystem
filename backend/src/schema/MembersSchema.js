const mongoose = require('mongoose');
const MemberModel = mongoose.Schema({
    FullName: String,
    FatherName: String,
    MembershipNo: String,
    CNIC : Number,
    PhoneNo: String,
    Picture: String
});
const DataSample =mongoose.model('MembersData', MemberModel);
module.exports =DataSample;