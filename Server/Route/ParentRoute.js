const express=require("express")
const router=express.Router()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {parentModel} = require("../Model/ParentShema")
const {teacherModel} = require("../Model/TeacherSchema")
const mailformat = /^[a-zA-Z0-9.!#$%&.’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const txt = /.com/;
const phoneregex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/

router.post("/register",async(req,res)=>{
try
{
    const {studentname,parentname, email ,password,batch,status,parentphone}=req.body
    console.log("req body",req.body)
    const teacherid = req.query.teacherid
  
    if(!studentname || !parentname || !email   || !batch || !password || !status || !parentphone)
    {
        return res.status(400).json({message:" Empty Fields !!!"})
    }
    const parent = await parentModel.findOne({email})
    if(parent){
        return res.status(400).json({message:" email already in use !!!"})
    }
   if(!parentphone.match(phoneregex) )
   {
    return res.status(400).json({message:" Enter a 10 digit valid Phone number.. !!!"})
   }
    
    const isEmailValid = mailformat.test(email) && txt.test(email);
    if (!isEmailValid) {
        return res.status(400).json({ message: "Enter a valid email" });
    }
    if (!password.match(passformat)) 
    {
        return res.status(400).json({message:" Password should contain Minimum 8 charactersAt least one uppercase character,At least one lowercase character,At least one digit,At least one special character ",});
    }
    const classname =await teacherModel.findById(teacherid)
    console.log("classnameteacher",classname.batch,"batchofstd",batch)
    if(classname.batch !== batch )
    {
        return res.status(400).json({message:"you have no right to add to this Provided division"})
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newParent=new parentModel({studentname,parentname,email,password:hashedPassword,batch,status,parentphone:`+91-${parentphone}`})
    await newParent.save()
    res.status(200).json({message:"Parent registration successfull "})
}
catch(error)
{
    console.log("error faced",error)
    return res.status(400).json({message:"Error in Parent Registration"})
}

})


router.post("/login",async(req,res)=>{
    try{
    const {email,password} = req.body
    const parent=await parentModel.findOne({email})
    if(!email || !password)
    {
        return res.status(400).json({message:"empty fields"})
    }
   
    if(!parent){
        return res.status(400).json({message:"Invalid Account !!!"})
    }
   
    const isPasswordValid= await bcrypt.compare(password,parent.password)

    if(!isPasswordValid)
    {
        return res.status(400).json({message:"Invalid password !!"})
    }

    const token = JWT.sign({id : parent._id},"secret")
   return res.status(200).json({message:"Successfully logged-in",token:token,parentID:parent._id,parentName:parent.parentname,parentClass:parent.batch})
}
catch(error)
{
    return res.status(400).json({message:"Error in Parent Login!!!"})
}


})
router.get("/getallparent",async(req,res)=>{

    try{
        if(req.query.teacherid)
        {
            const teacherid = req.query.teacherid
            const teacher = await teacherModel.findById(teacherid)
             
            const data = await parentModel.find({batch:teacher.batch})
            res.status(200).json({parent:data})
        }
        else{
            const data = await parentModel.find({})
            res.status(200).json({parent:data})
        }
   
    }
    catch(error){
        return res.status(400).json({message:"Unable to fetch parent"})
    }
})
router.get("/find/:id",async(req,res)=>{
    try{
        console.log("id",req.params.id)
       const User = await parentModel.findById(req.params.id)
        res.status(200).json({parent:User})
    }
    catch(error){
        res.status(400).json({message:"Unable to fetch doctor",error})
    }
})
// edit other data
router.put("/edit/:id",async(req,res)=>{
    try {
        const {id}= req.params
        const {studentname,parentname,email,batch,parentphone,status}=req.body
        const response= await parentModel.findByIdAndUpdate(id,{
            studentname,parentname,email,batch,parentphone,status
        })
        if(!studentname || !parentname || !email || !parentphone  || !status || !batch){
           return res.status(400).json({message:" All fields  are required"})
        }

        if(!response){
            return res.status(400).json({message:"Parent Not Found"})
        }else{
            return res.status(200).json({message:"Parent Acoount Updated Sucessfully"})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"An error Occured"})
    }
})

router.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}= req.params
        const response= await parentModel.findByIdAndDelete(id)
        console.log(response)
         return res.status(200).json({message:"Student Deleted Sucessfully"})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Internal error occured"})
    }
})
//passreq
router.post("/passreq/:id",async(req,res)=>{
    try{
     const {prevpassword} = req.body
      const data = await parentModel.findById(req.params.id)
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
//update pass

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
  
      const data = await parentModel.findByIdAndUpdate(req.params.id,{password:hashedPassword})
        res.status(200).json({message:" Successfully Updated..."})
   
    }
    catch(error){
        console.log("error",error)
         res.status(400).json({message:"Unable to Update"})
    }
  })
module.exports=router