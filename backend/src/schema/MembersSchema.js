const mongoose = require('mongoose');
const MemberModel = mongoose.Schema({
    FullName: String,
    FatherName: String,
    MembershipNo: String,
    CNIC : String,
    PhoneNo: String,
});
const DataSample =mongoose.model('MembersData', MemberModel);
module.exports =DataSample;