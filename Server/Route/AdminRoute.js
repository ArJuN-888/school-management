const express=require("express")
const router=express.Router()
require("dotenv").config()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {adminModel} =require('../Model/AdminSchema.js')


router.post("/register",async(req,res)=>{
    const {username,email,password,status}=req.body;

    const admin=await adminModel.findOne({email})

    if(admin){
        return res.json({message:" email already in use !!!"})
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const newAdmin=new adminModel({username,email,password:hashedPassword,status})
    await newAdmin.save()
    res.json({message:"Admin registered successfully!!! "})
})


router.post("/login",async(req,res)=>{
    try{
    const {email,password} = req.body
    const admin=await adminModel.findOne({email})
    console.log(admin);
    if(!email || !password)
    {
        return res.status(400).json({message:"empty fields"})
    }
   
    if(!admin){
        return res.status(400).json({message:"Invalid Account !!!"})
    }
   
    const isPasswordValid= await bcrypt.compare(password,admin.password)

    if(!isPasswordValid)
    {
        return res.status(400).json({message:"Invalid password !!"})
    }

    const token = JWT.sign({id : admin._id},process.env.SECRET)
   return res.status(200).json({message:"Successfully logged-in",token:token,adminID:admin._id,admin})
}
catch(error)
{
    console.log("err",error);
    return res.status(400).json({message:"error login !!!"})
    
}


})
router.get("/getadmin",async(req,res)=>{
    try{
    const data = await adminModel.find({})
    res.status(200).json({admin:data})
    }
    catch(error){
        return res.status(400).json({message:"Unable to fetch admin"})
    }
})
router.get("/find/getadmin/:id",async(req,res)=>{
    try{
    const data = await adminModel.findById(req.params.id)
    res.status(200).json({admin:data})
    }
    catch(error){
        return res.status(400).json({message:"Unable to fetch admin"})
    }
})
module.exports=router