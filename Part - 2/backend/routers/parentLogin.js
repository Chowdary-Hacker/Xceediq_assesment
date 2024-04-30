const express = require("express")
const parentLoginModel = require("../models/parentLogin");
const jwt = require("jsonwebtoken")
const middleware = require('../middleware');
const bcrypt = require("bcrypt");
const router = express.Router();
const cors = require("cors");
const server = express();
server.use(cors());
server.use(express.json()); 

router.post("/", async (req,res)=>{
    const { admissionNumber, password } = req.body;
    try {
        const result = await parentLoginModel.findOne({ admissionNumber:admissionNumber });
        if (result) {
            const matched = await bcrypt.compare(password, result.password);
            let payload = {user:{id : result.id}}
            if (matched) {
                jwt.sign(payload,"jwtSecret",{expiresIn:1800000},(err,token)=>{
                    if(err){res.status(200).json();}else{return res.status(222).json({token})}
                })
            } else {
                res.status(200).json();
            }
        } else {
            console.log('No document found');
            res.status(200).json();
        }
    } catch (error) {
        console.error(error);
        res.status(200).json();
    }
});

router.post("/reg",async (req,res)=>{
   let {admissionNumber,password} = req.body;
    try{
        const resultt = await parentLoginModel.findOne({ admissionNumber:admissionNumber });
        if (resultt) {res.status(211).json()}
        let encr = await bcrypt.hash(password,10);
        let add = parentLoginModel({admissionNumber:admissionNumber, password:encr});
       add.save();
        res.status(222).json();
        }
        catch(e){
            res.status(200).json();
            console.log(e);
        }
});

router.get("/parentDashboard", middleware, async (req,res)=>{
    try{
        let exist = await parentLoginModel.findById(req.user.id);
        if(!exist){return res.status(200).json()} res.status(222).json(req.tokenn);
   }
   catch(e){
       console.log(e); return res.status(200).json();
   }
});
/*
router.put("/:id",async (req,res)=>{
    let {name,email,age} = req.body;
    let id = req.params.id;
    let student = await  studentModel.findByIdAndUpdate(id,{name,age,email},{new:false});
    res.json(student);
});

router.delete("/:id",async (req,res)=>{
    let s = await  studentModel.findByIdAndDelete(req.params.id);
    if(s != null) res.json(s);
    else res.status(404).send("No such student found");
})
*/
module.exports = router