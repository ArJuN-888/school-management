const express=require("express")
const router=express.Router()
require("dotenv").config()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {eoModel} =require('../Model/EoSchema')
const mailformat = /^[a-zA-Z0-9.!#$%&.’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const txt = /.com/;

router.post("/register",async(req,res)=>{
    const {username,email,password,organization,status,filename}=req.body;
      if(!username || !email || !password || !organization || !status || !filename)
      {
        return res.status(400).json({message:"empty fields...."})
      }
      const isEmailValid = mailformat.test(email) && txt.test(email);
  
      if (!isEmailValid) {
        return res.status(400).json({ message: "Enter a valid email" });
      }
    
      if (!password.match(passformat)) {
        return res.status(400).json({
          message: "Password should contain at least 8 characters, one uppercase character, one lowercase character, one digit, and one special character",
        });
      }
    const eo =await eoModel.findOne({email})

    if(eo){
        return res.status(400).json({message:" email already in use !!!"})
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const newEO=new eoModel({username,email,password:hashedPassword,status,organization,filename})
    await newEO.save()
    res.status(200).json({message:"Organization  registered successfully!!! "})
})


router.post("/login",async(req,res)=>{
    try{
    const {email,password} = req.body
    const eo=await eoModel.findOne({email})
    console.log(eo);
    if(!email || !password)
    {
        return res.status(400).json({message:"empty fields"})
    }
   
    if(!eo){
        return res.status(400).json({message:"Invalid Account !!!"})
    }
   
    const isPasswordValid= await bcrypt.compare(password,eo.password)

    if(!isPasswordValid)
    {
        return res.status(400).json({message:"Invalid password !!"})
    }

    const token = JWT.sign({id : eo._id},process.env.SECRET)
   return res.status(200).json({message:"Successfully logged-in",token:token,eoID:eo._id,eoName : eo.username })
}
catch(error)
{
    return res.status(400).json({message:"error login !!!"})
}


})
router.get("/geteo",async(req,res)=>{
    try{
    const data = await eoModel.find({})
    res.status(200).json({eo:data})
    }
    catch(error){
        return res.status(400).json({message:"Unable to fetch "})
    }
})
router.get("/find/geteo/:id",async(req,res)=>{
    try{
    const data = await eoModel.findById(req.params.id)
    console.log("eooooo",data)
    res.status(200).json({eo:data})
    }
    catch(error){
        return res.status(400).json({message:"Unable to fetch admin"})
    }
})
//update other data
router.put("/update/:id",async(req,res)=>{
    try{
     const {username,email,status,organization} = req.body
     if(!username|| !email || !status || !organization )
     {
      return   res.status(400).json({message:"Empty fields..."})
     }
      const data = await eoModel.findByIdAndUpdate(req.params.id,{username,email,status,organization})
        res.status(200).json({message:"Profile Successfully Updated..."})
   
    }
    catch(error){
         res.status(400).json({message:"Unable to Update"})
    }
  })
router.post("/passreq/:id",async(req,res)=>{
    try{
     const {prevpassword} = req.body
      const data = await eoModel.findById(req.params.id)
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
  
      const data = await eoModel.findByIdAndUpdate(req.params.id,{password:hashedPassword})
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
       const User = await eoModel.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Successfully deleted..."})
    }
    catch(error){
      console.log("error",error)
        res.status(400).json({message:"Unable to Delete",error})
    }
  })
module.exports=router