const express=require("express")
const router=express.Router()
require("dotenv").config()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const fs = require("fs")
const {staffModel} =require('../Model/StaffShema')
const { parentModel } = require("../Model/ParentShema")
const mailformat = /^[a-zA-Z0-9.!#$%&.’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const txt = /.com/;
const phoneregex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
const Multerstore = require("../Config/MulterConfig")
router.post("/register",Multerstore,async(req,res)=>{
    const {username,email,password,status,specialization,batch,phone}=req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Please select a file" });
    }
  if(!username || !email || !password || !status || !specialization || !batch  ||!phone)
  {
    const callback = () => {
      console.log("Removed profile due to invalid registration credentials");
    };
    fs.unlink(`public/uploads/${req.file.filename}`, callback);
    return res.status(400).json({message:"Empty fields..."})
  }
  const isEmailValid = mailformat.test(email) && txt.test(email);
  
  if (!isEmailValid) {
    const callback = () => {
      console.log("Removed profile due to invalid registration credentials");
    };
    fs.unlink(`public/uploads/${req.file.filename}`, callback);
    return res.status(400).json({ message: "Enter a valid email" });
  }

  if (!password.match(passformat)) {
    const callback = () => {
      console.log("Removed profile due to invalid registration credentials");
    };
    fs.unlink(`public/uploads/${req.file.filename}`, callback);
    return res.status(400).json({
      message: "Password should contain at least 8 characters, one uppercase character, one lowercase character, one digit, and one special character",
    });
  }
  if (!phone.match(phoneregex)) {
    const callback = () => {
        console.log("Removed profile due to invalid registration credentials");
      };
      fs.unlink(`public/uploads/${req.file.filename}`, callback);
    return res.status(400).json({ message: "Enter a 10 digit valid Phone number!!! !!!" });
  }
    const staff=await staffModel.findOne({email})

    if(staff){
      const callback = () => {
        console.log("Removed profile due to invalid registration credentials");
      };
      fs.unlink(`public/uploads/${req.file.filename}`, callback);
        return res.status(400).json({message:" email already in use !!!"})
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const newStaff=new staffModel({username,email,password:hashedPassword,status,specialization,batch,filename:req.file.filename,phone})
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
   return res.status(200).json({message:"Successfully logged-in",token:token,staffID:staff._id,staff,staffbatch:staff.batch})
}
catch(error)
{
    console.log("err",error);
    return res.status(400).json({message:"error login !!!"})
    
}


})
//edit pic


router.put("/editpic/:staffID",Multerstore,async(req,res)=> {
  try {
   const {staffID} = req.params
    const staff = await staffModel.findById(staffID)
    if (!req.file) {
      return res.status(400).json({ message: "Please select a file" });
    }
    console.log("admin", staffID);
    console.log("userfile", req.file);
    const callback = (error) => {
      if (error) {
        console.log("Unable to delete ", error);
      } else {
        console.log("Successfully modified previous profile...");
      }
    };
    fs.unlink(`public/uploads/${staff.filename}`, callback);
    console.log("req.file.filename", req.file.filename);
    const data = await staffModel.findByIdAndUpdate(
      staffID,
      { filename: req.file.filename },
      { new: "true" }
    );
     res.status(200).json({ message: "profile successfully updated", staff: data });
  } catch (error) {
     res.status(400).json({message:"Unable to update profile"})
  }
});
router.get("/getstaff",async(req,res)=>{
    try{
      if(req.query.parentid)
      {
        const parent = await parentModel.findById(req.query.parentid)
        //teacher of the student of that particular parent based on batch provided by parent
        const data = await staffModel.find({batch:parent.batch})
       return res.status(200).json({staff:data})
      }
      else
      {
        const data = await staffModel.find({})
        res.status(200).json({staff:data})
      }
   
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
//update other data
router.put("/update/:id",async(req,res)=>{
    try{
     const {username,email,status,specialization,batch,phone} = req.body
     if(!username|| !email || !status || !specialization || !batch)
     {
      return   res.status(400).json({message:"Empty fields..."})
     }
      const data = await staffModel.findByIdAndUpdate(req.params.id,{username,email,status,specialization,batch,phone})
        res.status(200).json({message:"Profile Successfully Updated..."})
   
    }
    catch(error){
         res.status(400).json({message:"Unable to Update"})
    }
  })
router.post("/passreq/:id",async(req,res)=>{
    try{
     const {prevpassword} = req.body
      const data = await staffModel.findById(req.params.id)
      const isPasswordValid= await bcrypt.compare(prevpassword,data.password)
      if(!isPasswordValid)
      {
       return res.status(400).json({message:"Password Update request failed..."})
      }
       return  res.status(200).json({message:" verified... You can now provide a new password...",grant:true})
   
    }
    catch(error){
        return res.status(400).json({message:"Unable to Update"})
    }
  })

  //update password
router.put("/updatepassword/:id",async(req,res)=>{
    try{
     const {password,confirmation} = req.body
     if(!password || !confirmation)
     {
      return res.status(400).json({message:"Empty fields..."})
     }
     if(password !== confirmation)
     {
      return res.status(400).json({message:"Confirmation Missmatch..."})
     }
     if (!password.match(passformat))
     {
      return res.status(400).json({ message: "Password should contain at least 8 characters, one uppercase character, one lowercase character, one digit, and one special character"})
     }
     const hashedPassword = await bcrypt.hash(password,10)
  
      const data = await staffModel.findByIdAndUpdate(req.params.id,{password:hashedPassword})
        res.status(200).json({message:" Successfully Updated..."})
   
    }
    catch(error){
        console.log("error",error)
         res.status(400).json({message:"Unable to Update"})
    }
  })
  router.delete("/delete/:id",async(req,res)=>{
    try{
        console.log("id",req.params.id)
       const User = await staffModel.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Successfully deleted..."})
    }
    catch(error){
      console.log("error",error)
        res.status(400).json({message:"Unable to Delete",error})
    }
  })
module.exports=router