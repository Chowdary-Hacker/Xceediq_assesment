const mongoose = require("../mongoose")

const studentInfoSchema = new mongoose.Schema({
    admissionNumber:String,
    class:{type:Number},
    parentEmail:{type:String,required:true},
    studentEmail:{type:String,required:true},
    marks:{telugu:{assesment1:{type:Number}, assesment2:{type:Number}, assesment3:{type:Number}, finalExam:{type:Number}},
           hindi:{assesment1:{type:Number}, assesment2:{type:Number}, assesment3:{type:Number}, finalExam:{type:Number}},
           english:{assesment1:{type:Number}, assesment2:{type:Number}, assesment3:{type:Number}, finalExam:{type:Number}},
           maths:{assesment1:{type:Number}, assesment2:{type:Number}, assesment3:{type:Number}, finalExam:{type:Number}},
           science:{assesment1:{type:Number}, assesment2:{type:Number}, assesment3:{type:Number}, finalExam:{type:Number}},
           social:{assesment1:{type:Number}, assesment2:{type:Number}, assesment3:{type:Number}, finalExam:{type:Number}}
}   
});
let studentInfoModel = mongoose.model('studentInfo',studentInfoSchema);

module.exports = studentInfoModel;