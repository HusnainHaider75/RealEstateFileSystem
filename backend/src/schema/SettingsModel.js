const mongoose = require('mongoose');
const SettingModel = mongoose.Schema({
    PageSettingString: String
});

module.exports  =mongoose.model('PageSetting', SettingModel);
