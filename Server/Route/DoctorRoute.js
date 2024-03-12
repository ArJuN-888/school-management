const express=require("express")
const router=express.Router()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {doctorModel} = require("../Model/DoctorSchema")
const mailformat = /^[a-zA-Z0-9.!#$%&.’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const txt = /.com/;
const passuser=/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/

router.post("/register",async(req,res)=>{
try
{
    const {username,email,password,qualification,status}=req.body;

    const doctor=await doctorModel.findOne({email})
    if( !username || !email || !password || !status || !qualification ) 
    {
        return res.json({message:" Empty Fields !!!"})
    }
    if(doctor){
        return res.json({message:" email already in use !!!"})
    }
    if(!username.match(passuser))
    {
        return res.status(400).json({message:" Password should contain Minimum 8 characters,Only contains alphanumeric characters, underscore and dot.Underscore and dot can't be at the end or start of a username.Underscore and dot can't be next to each other.Underscore or dot can't be used multiple times in a row .",}); 
    }
    const isEmailValid = mailformat.test(email) && txt.test(email);
    if (!isEmailValid) {
        return res.status(400).json({ message: "Enter a valid email" });
    }
    if (!password.match(passformat)) 
    {
        return res.status(400).json({message:" Password should contain Minimum 8 characters At least one uppercase character,At least one lowercase character,At least one digit,At least one special character ",});
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newDoctor=new doctorModel({email,password:hashedPassword,username,qualification,status})
    await newDoctor.save()
    res.json({message:"Doctor Registration Successfull "})
}
catch(error)
{
    return res.status(400).json({message:"Error in Doctor Registration"})
}

})


router.post("/login",async(req,res)=>{
    try{
    const {email,password} = req.body
    const doctor=await doctorModel.findOne({email})
    if(!email || !password)
    {
        return res.status(400).json({message:"empty fields"})
    }
   
    if(!doctor){
        return res.status(400).json({message:"Invalid Account !!!"})
    }
   
    const isPasswordValid= await bcrypt.compare(password,doctor.password)

    if(!isPasswordValid)
    {
        return res.status(400).json({message:"Invalid password !!"})
    }

    const token = JWT.sign({id : doctor._id},"secret")
   return res.status(200).json({message:"Successfully logged-in",token:token,doctorID:doctor._id,username:doctor.username})
}
catch(error)
{
    return res.status(400).json({message:"Error in Doctor Login!!!"})
}


})
router.get("/getalldoctor",async(req,res)=>{
    try{
    const data = await doctorModel.find({})
    res.status(200).json({doctor:data})
    }
    catch(error){
        return res.status(400).json({message:"Unable to fetch doctor"})
    }
})
router.get("/find/:id",async(req,res)=>{
    try{
        console.log("id",req.params.id)
       const User = await doctorModel.findById(req.params.id)
        res.status(200).json({doctor:User})
    }
    catch(error){
        res.status(400).json({message:"Unable to fetch doctor",error})
    }
})

module.exports=router