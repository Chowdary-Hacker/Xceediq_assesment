const mongoose = require("../mongoose")

// fee model
const feeSchema = new mongoose.Schema({
    admissionNumber:String,
    studentName:String,
    paidAmount:{type:Number},
    totalAmount:{type:Number},
    date:{paidAmount:{type:Number}, edate:String}
});
let feeModel = mongoose.model('fee',feeSchema);

module.exports = feeModel;