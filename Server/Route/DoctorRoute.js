const express=require("express")
const router=express.Router()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {doctorModel} = require("../Model/DoctorSchema")
const mailformat = /^[a-zA-Z0-9.!#$%&.’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const txt = /.com/;

router.post("/register",async(req,res)=>{
try
{
    const {username,email,password,qualification,status}=req.body;

    const doctor=await doctorModel.findOne({email})

    if( !username || !email || !password || !status || !qualification ) 
    {
        return res.status(200).json({message:" Empty Fields !!!"})
    }

    if(doctor){
        return res.status(200).json({message:" email already in use !!!"})
    }
    const isEmailValid = mailformat.test(email) && txt.test(email);
    if (!isEmailValid) {
        return res.status(200).json({ message: "Enter a valid email" });
    }
    if (!password.match(passformat)) 
    {
        return res.status(200).json({message:" Password should contain Minimum 8 characters At least one uppercase character,At least one lowercase character,At least one digit,At least one special character ",});
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newDoctor=new doctorModel({email,password:hashedPassword,username,qualification,status})
    await newDoctor.save()
    res.status(200).json({message:"Doctor Registration Successfull "})
}
catch(error)
{
    console.log("error",error)
    return res.status(200).json({message:"Error in Doctor Registration"})
}

})


router.post("/login",async(req,res)=>{
    try{
    const {email,password} = req.body
    const doctor=await doctorModel.findOne({email})
    if(!email || !password)
    {
        return res.status(200).json({message:"empty fields"})
    }
   
    if(!doctor){
        return res.status(200).json({message:"Invalid Account !!!"})
    }
    
   
    const isPasswordValid= await bcrypt.compare(password,doctor.password)

    if(!isPasswordValid)
    {
        return res.status(200).json({message:"Invalid password !!"})
    }

    const token = JWT.sign({id : doctor._id},"secret")
   return res.status(400).json({message:"Successfully logged-in",token:token,doctorID:doctor._id,username:doctor.username})
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

router.delete("/delete/:id",async(req,res)=>{
    try{
        
       const User = await doctorModel.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Successfully Deleted Doctor",doctor:User})
    }
    catch(error){
        res.status(400).json({message:"Unable to delete doctor",error})
    }
})

router.put("/edit/:id",async(req,res)=>{
    try
     {
        const { id } = req.params;
        const { username,email,qualification } = req.body;
        console.log("up",req.body);
        if(!username || !email || !qualification)
        {
            return res.status(400).json({message:"Empty Field"})
        }
        await doctorModel.findByIdAndUpdate(id,{username,email,qualification});
        res.status(200).json({message:"Profile Updated successfully"})

      } 
    catch (error) 
      {
        return res.status(200).json({message:"Update Not Possible"});
      }
})

router.post('/docpassmatch/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const {password}=req.body

        if(!password)
        {
            return res.status(200).json({message:"Empty Field !!!"})
        }
        const doctor = await doctorModel.findOne({ _id: id });

        if(!doctor)
        {
            return res.status(200).json({message:"Account not found !!!"})
        }

        const isPasswordValid= await bcrypt.compare(password,doctor.password)

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

router.put('/docpassupdate/:id',async(req,res)=>{
    try
     {
        const { id } = req.params;
        const { password,conPass } = req.body;

        if(password!==conPass)
        {
            return res.json({message:"Password mismatched"})
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
        await doctorModel.findByIdAndUpdate(id,{password:hashedPassword});
        
        res.json({message:"Password Updated successfully"})


      } 
      catch (error) 
      {
        return res.status(200).json({message:"Update Not Possible"});
      }
})

module.exports=router