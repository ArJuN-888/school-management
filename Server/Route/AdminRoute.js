const express=require("express")
const router=express.Router()
require("dotenv").config()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const fs = require("fs")
const Multerstore = require("../Config/MulterConfig")
const {adminModel} =require('../Model/AdminSchema.js')
const mailformat = /^[a-zA-Z0-9.!#$%&.’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const txt = /.com/;



router.post("/register",Multerstore,async(req,res)=>{
    const {username,email,password,status}=req.body;
    if (!req.file) {
        return res.status(400).json({ message: "Please select a file" });
      }
  if(!username || !email || !password || !status )
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
    const admin=await adminModel.findOne({email})

    if(admin){
        const callback = () => {
            console.log("Removed profile due to invalid registration credentials");
          };
          fs.unlink(`public/uploads/${req.file.filename}`, callback);
        return res.status(400).json({message:" email already in use !!!"})
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const newAdmin=new adminModel({username,email,password:hashedPassword,status,filename:req.file.filename})
    await newAdmin.save()
    res.status(200).json({message:"Admin registered successfully!!! "})
})


router.post("/login",async(req,res)=>{
    try{
    const {email,password} = req.body
    const admin=await adminModel.findOne({email})
    console.log(admin);
    if(!email || !password)
    {
        return res.status(200).json({message:"empty fields"})
    }
   
    if(!admin){
        return res.status(200).json({message:"Invalid Account !!!"})
    }
   
    const isPasswordValid= await bcrypt.compare(password,admin.password)

    if(!isPasswordValid)
    {
        return res.status(200).json({message:"Invalid password !!"})
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
//edit pic

router.put("/editpic/:adminID",Multerstore,async(req,res)=> {
  try {
   const {adminID} = req.params
    const admin = await adminModel.findById(adminID)
    if (!req.file) {
      return res.status(400).json({ message: "Please select a file" });
    }
    console.log("admin", admin);
    console.log("userfile", req.file);
    const callback = (error) => {
      if (error) {
        console.log("Unable to delete ", error);
      } else {
        console.log("Successfully modified previous profile...");
      }
    };
    fs.unlink(`public/uploads/${admin.filename}`, callback);
    console.log("req.file.filename", req.file.filename);
    const data = await adminModel.findByIdAndUpdate(
      adminID,
      { filename: req.file.filename },
      { new: "true" }
    );
     res.status(200).json({ message: "profile successfully updated", admin: data });
  } catch (error) {
     res.status(400).json({message:"Unable to update profile"})
  }
});
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

router.put("/edit/:id",async(req,res)=>{
    try
     {
        const { id } = req.params;
        const { username,email,status } = req.body;
        if(!username || !email || !status)
        {
            return res.status(200).json({message:"Empty Field"})
        }
        await adminModel.findByIdAndUpdate(id,{username,email,status});
        res.status(200).json({message:"Profile Updated successfully.."})

      } 
    catch (error) 
      {
        return res.status(400).json({message:"Update Not Possible"});
      }
})

router.post('/admpassmatch/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const {password}=req.body
        const admin = await adminModel.findOne({ _id: id });


        if(!admin)
        {
            return res.status(200).json({message:"Account not found !!!"})
        }
        if(!password)
        {
            return res.status(200).json({message:"Empty Field !!!"})
        }
       
        const isPasswordValid= await bcrypt.compare(password,admin.password)

        if(!isPasswordValid)
        {
            return res.status(200).json({message:"Invalid password !!"})
        }

        return res.status(200).json({message:"You can now update your Password",status:true})
    }
    catch(error)
    {
        return res.status(400).json({message:"Error Occured"})
    }
})

router.put('/admpassupdate/:id',async(req,res)=>{
    try
     {
        const { id } = req.params;
        const { password,conPass } = req.body;

        if(password !== conPass)
        {
            return res.status(200).json({message:"Password mismatched"})
        } 
        if(!password || !conPass)
        {
            return res.status(200).json({message:"Empty Field"})
        }
        if(!password.match(passformat)) 
        {
            return res.status(200).json({message:" Password should contain Minimum 8 characters,At least one lowercase character,At least one digit,At least one special character ",});
        }
        const hashedPassword=await bcrypt.hash(password,10)
        await adminModel.findByIdAndUpdate(id,{password:hashedPassword});
        
        res.status(200).json({message:"Password Updated successfully"})


      } 
      catch (error) 
      {
        return res.status(400).json({message:"Update Not Possible"});
      }
})
module.exports=router