const express=require("express")
const router=express.Router()
require("dotenv").config()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {eoModel} =require('../Model/EoSchema')


router.post("/register",async(req,res)=>{
    const {username,email,password,organization,status}=req.body;
      if(!username || !email || !password || !organization || !status)
      {
        return res.status(400).json({message:"empty fields...."})
      }
    const eo =await eoModel.findOne({email})

    if(eo){
        return res.status(400).json({message:" email already in use !!!"})
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const newEO=new eoModel({username,email,password:hashedPassword,status,organization})
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
module.exports=router