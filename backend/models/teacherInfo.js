const mongoose = require("../mongoose")

// model teacherInfo
const teacherInfoSchema = new mongoose.Schema({
    email:{type:String,required:true},
    name:String,
    class:[{class:{type:Number},subject:String}],
    salary:{type:Number}
});
let teacherInfoModel = mongoose.model('teacherInfo',teacherInfoSchema);

module.exports = teacherInfoModel;