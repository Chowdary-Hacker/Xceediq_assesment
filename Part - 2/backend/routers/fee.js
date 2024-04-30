const express = require("express")
const feeModel = require("../models/fee");
const pdfkit = require('pdfkit');
const fs = require('fs');
const pdfDocument = new pdfkit;
const router = express.Router();


router.post("/basic",async (req,res)=>{
    let {admissionNumber, parentName, studentName, studentClass, paidAmount, totalAmount} = req.body;
    let {StudentClass, PaidAmount, TotalAmount} ={
        StudentClass: parseInt(studentClass),
        PaidAmount: parseInt(paidAmount),
        TotalAmount: parseInt(totalAmount)
      };
      try{
    let student = await feeModel({admissionNumber:admissionNumber, parentName:parentName, studentName:studentName, studentClass:StudentClass, paidAmount:PaidAmount, totalAmount:TotalAmount});
        student.save();
    res.status(222).json();}catch(e){res.status(200).json()}
});


router.get("/:admissionNumber",async (req,res)=>{
    try{
    let admissionNumber = req.params.admissionNumber;
    let studentsList = await  feeModel.findOne({ admissionNumber:admissionNumber });
    res.status(222).json(studentsList);}catch(e){res.status(200).json()}
});

router.put("/:admissionNumber",async (req,res)=>{
    try{
        let admissionNumber = req.params.admissionNumber;
        let {parentName, studentName, studentClass, totalAmount} = req.body();
        let {StudentClass, TotalAmount} ={
            StudentClass: parseInt(studentClass),
            TotalAmount: parseInt(totalAmount)
          };
        let studentsList = await  feeModel.findOneAndUpdate(
            { admissionNumber: admissionNumber }, 
            { parentName:parentName, studentName:studentName, studentClass:StudentClass, totalAmount:TotalAmount }, 
            { new: true } 
          );
        res.status(222).json(studentsList);}catch(e){res.status(200).json()}
});

router.put("/paying/:admissionNumber",async (req,res)=>{
    try{
        let admissionNumber = req.params.admissionNumber;
        let {payingAmount, date} = req.body();
        let {PayingAmount} ={
            PayingAmount: parseInt(payingAmount),
          };
          let shr = await  feeModel.findOne({ admissionNumber:admissionNumber });
          const paidAmount=PayingAmount+shr.paidAmount ; 
          const totalAmount=shr.totalAmount;
        let studentsList = await  feeModel.findOneAndUpdate(
            { admissionNumber: admissionNumber }, 
            { paidAount:paidAmount}, 
            { new: true } 
          );
          const pending=totalAmount-studentsList.paidAmount;
        pdfDocument.pipe(fs.createWriteStream("../reciepts/"+admissionNumber+"/"+date+".pdf"));
        pdfDocument.image('../backgroundimg.png', {
            fit: [doc.page.width, doc.page.height], 
            align: 'center',
            valign: 'center'
          });
        pdfDocument.fontSize(24)
          .fillColor('black') 
          .text(`Student Name: ${studentsList.studentName}`, { align: 'center' })
          .text(`Admission Number: ${admissionNumber}`, { align: 'center' })
          .text(`Studying Class : ${studentsList.studentClass}`, { align: 'center' })
          .text(`Date of payment : ${studentsList.date}`, { align: 'center' })
          .text(`Amount paid : ${payingAmount}`, { align: 'center' })
          .text(`Total fee : ${studentsList.totalAmount}`, { align: 'center' });
          pdfDocument.end();
        res.status(222).json(pending);}catch(e){res.status(200).json()}
});

module.exports = router