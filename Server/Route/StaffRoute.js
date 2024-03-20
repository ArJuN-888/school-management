const express=require("express")
const router=express.Router()
require("dotenv").config()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {staffModel} =require('../Model/StaffShema')


router.post("/register",async(req,res)=>{
    const {username,email,password,status,specialization,batch}=req.body;
  if(!username || !email || !password || !status || !specialization || !batch)
  {
    return res.status(400).json({message:"Empty fields..."})
  }
    const staff=await staffModel.findOne({email})

    if(staff){
        return res.status(400).json({message:" email already in use !!!"})
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const newStaff=new staffModel({username,email,password:hashedPassword,status,specialization,batch})
    await newStaff.save()
    res.status(200).json({message:"Staff registered successfully!!! "})
})


router.post("/login",async(req,res)=>{
    try{
    const {email,password} = req.body
    const staff=await staffModel.findOne({email})
    console.log("staff",staff);
    if(!email || !password)
    {
        return res.status(400).json({message:"empty fields"})
    }
   
    if(!staff){
        return res.status(400).json({message:"Invalid Account !!!"})
    }
   
    const isPasswordValid= await bcrypt.compare(password,staff.password)

    if(!isPasswordValid)
    {
        return res.status(400).json({message:"Invalid password !!"})
    }

    const token = JWT.sign({id : staff._id},process.env.SECRET)
   return res.status(200).json({message:"Successfully logged-in",token:token,staffID:staff._id,staff})
}
catch(error)
{
    console.log("err",error);
    return res.status(400).json({message:"error login !!!"})
    
}


})
router.get("/getstaff",async(req,res)=>{
    try{
    const data = await staffModel.find({})
    res.status(200).json({staff:data})
    }
    catch(error){
        return res.status(400).json({message:"Unable to fetch staff"})
    }
})
router.get("/find/getstaff/:id",async(req,res)=>{
    try{
    const data = await staffModel.findById(req.params.id)
    res.status(200).json({staff:data})
    }
    catch(error){
        return res.status(400).json({message:"Unable to fetch staff"})
    }
})
module.exports=router