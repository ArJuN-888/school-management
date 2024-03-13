const express=require("express")
const router=express.Router()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {parentModel} = require("../Model/ParentShema")
const {teacherModel} = require("../Model/TeacherSchema")
const mailformat = /^[a-zA-Z0-9.!#$%&.’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const txt = /.com/;
const passuser=/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/

router.post("/register",async(req,res)=>{
try
{
    const {username,email,password,roll,studentname,studentclass,status}=req.body;
   const teacherid = req.query.teacherid
  
    if(!username || !email || !password || !studentclass || !roll || !studentname || !status)
    {
        return res.status(400).json({message:" Empty Fields !!!"})
    }
    const parent = await parentModel.findOne({email})
    if(parent){
        return res.status(400).json({message:" email already in use !!!"})
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
        return res.status(400).json({message:" Password should contain Minimum 8 charactersAt least one uppercase character,At least one lowercase character,At least one digit,At least one special character ",});
    }
    const classname =await teacherModel.findById(teacherid)
    console.log("classnameteacher",classname.batch,"batchofstd",studentclass)
    if(classname.batch !== studentclass )
    {
        return res.status(400).json({message:"you have no right to add to this Provided division"})
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newParent=new parentModel({email,password:hashedPassword,username,studentclass,roll,studentname,status})
    await newParent.save()
    res.status(200).json({message:"Parent registration successfull "})
}
catch(error)
{
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
   return res.status(200).json({message:"Successfully logged-in",token:token,parentID:parent._id,parentName:parent.username})
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
             
            const data = await parentModel.find({studentclass:teacher.batch})
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

module.exports=router