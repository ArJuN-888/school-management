const express=require("express")
const router=express.Router()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const fs =  require("fs")
const Multerstore = require("../Config/MulterConfig")
const {doctorModel} = require("../Model/DoctorSchema")
const mailformat = /^[a-zA-Z0-9.!#$%&.’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const phoneregex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
const txt = /.com/;

router.post("/register",Multerstore,async(req,res)=>{
try
{
    const {username,email,password,qualification,status,phone}=req.body;

    const doctor=await doctorModel.findOne({email})
    if (!req.file) {
        return res.status(400).json({ message: "Please select a file" });
      }
    if( !username || !email || !password || !status || !qualification  ||!phone ) 
    {
        const callback = () => {
            console.log("Removed profile due to invalid registration credentials");
          };
          fs.unlink(`public/uploads/${req.file.filename}`, callback);
        return res.status(400).json({message:" Empty Fields !!!"})
    }
    if(doctor){
        const callback = () => {
            console.log("Removed profile due to invalid registration credentials");
          };
          fs.unlink(`public/uploads/${req.file.filename}`, callback);
        return res.status(400).json({message:" email already in use !!!"})
    }
    const isEmailValid = mailformat.test(email) && txt.test(email);
    if (!isEmailValid) {
        const callback = () => {
            console.log("Removed profile due to invalid registration credentials");
          };
          fs.unlink(`public/uploads/${req.file.filename}`, callback);
        return res.status(400).json({ message: "Enter a valid email" });
    }
    if (!phone.match(phoneregex)) {
        const callback = () => {
            console.log("Removed profile due to invalid registration credentials");
          };
          fs.unlink(`public/uploads/${req.file.filename}`, callback);
        return res.status(400).json({ message: "Enter a 10 digit valid Phone number!!!" });
    }
    if (!password.match(passformat)) 
    {
        const callback = () => {
            console.log("Removed profile due to invalid registration credentials");
          };
          fs.unlink(`public/uploads/${req.file.filename}`, callback);
        return res.status(400).json({message:" Password should contain Minimum 8 characters At least one uppercase character,At least one lowercase character,At least one digit,At least one special character ",});
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newDoctor=new doctorModel({email,password:hashedPassword,username,qualification,status,filename:req.file.filename,phone})
    await newDoctor.save()
    res.status(200).json({message:"Doctor Registration Successfull "})
}
catch(error)
{
    console.log("error",error)
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
   return res.status(200).json({message:"Successfully logged-in",token:token,doctorID:doctor._id,username:doctor.username,profile:doctor.filename})
}
catch(error)
{
    return res.status(400).json({message:"Error in Doctor Login!!!"})
}



})
//edit pic 
router.put("/editpic/:doctorID",Multerstore,async(req,res)=> {
    try {
     const {doctorID} = req.params
      const doctor = await doctorModel.findById(doctorID)
      if (!req.file) {
        return res.status(400).json({ message: "Please select a file" });
      }
      console.log("admin", doctorID);
      console.log("userfile", req.file);
      const callback = (error) => {
        if (error) {
          console.log("Unable to delete ", error);
        } else {
          console.log("Successfully modified previous profile...");
        }
      };
      fs.unlink(`public/uploads/${doctor.filename}`, callback);
      console.log("req.file.filename", req.file.filename);
      const data = await doctorModel.findByIdAndUpdate(
        doctorID,
        { filename: req.file.filename },
        { new: "true" }
      );
       res.status(200).json({ message: "profile successfully updated", doctorprofile: data.filename });
    } catch (error) {
       res.status(400).json({message:"Unable to update profile"})
    }
  });
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
        const { username,email,qualification,phone } = req.body;
        if(!username || !email || !qualification || !phone)
        {
            return res.status(400).json({message:"Empty Field"})
        }
        if (!phone.match(phoneregex)) {

            return res.status(400).json({ message: "Enter a 10 digit valid Phone number!!!" });
        }
        const isEmailValid = mailformat.test(email) && txt.test(email);
        if (!isEmailValid) {
   
            return res.status(400).json({ message: "Enter a valid email" });
        }
        await doctorModel.findByIdAndUpdate(id,{username,email,qualification,phone});
        res.status(200).json({message:"Profile Updated successfully"})

      } 
    catch (error) 
      {
        return res.status(400).json({message:"Update Not Possible"});
      }
})

router.post('/docpassmatch/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const {password}=req.body
        const doctor = await doctorModel.findOne({ _id: id });


        if(!doctor)
        {
            return res.status(400).json({message:"Account not found !!!"})
        }
        if(!password)
        {
            return res.status(400).json({message:"Empty Field !!!"})
        }
       
        const isPasswordValid= await bcrypt.compare(password,doctor.password)

        if(!isPasswordValid)
        {
            return res.status(400).json({message:"Invalid password !!"})
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

        if(password !== conPass)
        {
            return res.status(400).json({message:"Password mismatched"})
        } 
        if(!password || !conPass)
        {
            return res.status(400).json({message:"Empty Field"})
        }
        if(!password.match(passformat)) 
        {
            return res.status(400).json({message:" Password should contain Minimum 8 characters,At least one lowercase character,At least one digit,At least one special character ",});
        }
        const hashedPassword=await bcrypt.hash(password,10)
        await doctorModel.findByIdAndUpdate(id,{password:hashedPassword});
        
        res.status(200).json({message:"Password Updated successfully"})


      } 
      catch (error) 
      {
        return res.status(400).json({message:"Update Not Possible"});
      }
})

module.exports=router