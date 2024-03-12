const express=require("express")
const router=express.Router()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {parentModel} = require("../Model/ParentShema")
const mailformat = /^[a-zA-Z0-9.!#$%&.’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const txt = /.com/;
const passuser=/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/

router.post("/register",async(req,res)=>{
try
{
    const {username,email,password,roll,studentname,studentclass}=req.body;

    const parent=await parentModel.findOne({email})
    if(!username || !email || !password || !studentclass || !roll || !studentname)
    {
        return res.json({message:" Empty Fields !!!"})
    }
    if(parent){
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
        return res.status(400).json({message:" Password should contain Minimum 8 charactersAt least one uppercase character,At least one lowercase character,At least one digit,At least one special character ",});
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newParent=new parentModel({email,password:hashedPassword,username,studentclass,roll,studentname})
    await newParent.save()
    res.json({message:"Parent registration successfull "})
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
   return res.status(200).json({message:"Successfully logged-in",token:token,parentID:parent._id})
}
catch(error)
{
    return res.status(400).json({message:"Error in Parent Login!!!"})
}


})

module.exports=router