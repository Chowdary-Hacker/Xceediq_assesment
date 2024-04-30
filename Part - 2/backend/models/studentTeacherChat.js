const mongoose = require("../mongoose")

// studentTeacherChat model
const studentTeacherChatSchema = new mongoose.Schema({
    data:String,
    sender:String,
    reciever:String,
    studentName:String,
    teacherName:String,
    teacherMail:String,
    date:String
});
let studentTeacherChatModel = mongoose.model('studentTeacherChat',studentTeacherChatSchema);

module.exports = studentTeacherChatModel;