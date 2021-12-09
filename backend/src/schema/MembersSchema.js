const mongoose = require('mongoose');
const MemberModel = mongoose.Schema({
    FullName: String,
    FatherName: String,
    MembershipNo: String,
    CNIC: Number,
    PhoneNo: String,
    Address: String,
    Picture: String,
    Status: Boolean,
    PrefixReg: {
        type: String,
        default:"RGC-2021-S"
    },
    PostfixReg: {
        type: Number,
        default: 0
    }
});
const DataSample = mongoose.model('MembersData', MemberModel);
module.exports = DataSample;