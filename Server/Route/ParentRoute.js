const express=require("express")
const router=express.Router()
const fs =require("fs")
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {parentModel} = require("../Model/ParentShema")
const {teacherModel} = require("../Model/TeacherSchema")
const mailformat = /^[a-zA-Z0-9.!#$%&.’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const txt = /.com/;
const phoneregex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
const Multerstore = require("../Config/MulterConfig")
router.post("/register",Multerstore, async (req, res) => {
    try {
        const { studentname, parentname, email, password, batch, status, parentphone, rollno ,address} = req.body;

        console.log("req body", req.body);

        const teacherid = req.query.teacherid;
        const batchnumber = req.query.batchn;
        console.log("batchnumber", batchnumber, teacherid);
        if (!req.file) {
            return res.status(400).json({ message: "Please select a file" });
          }
        if (!studentname || !parentname || !email || !batch || !password || !status || !parentphone || !rollno ||!address ) {
            const callback = () => {
                console.log("Removed profile due to invalid registration credentials");
              };
              fs.unlink(`public/uploads/${req.file.filename}`, callback);
            return res.status(400).json({ message: "Empty Fields!!!" });
        }
        
        const parent = await parentModel.findOne({ email });
        if (parent) {
            const callback = () => {
                console.log("Removed profile due to invalid registration credentials");
              };
              fs.unlink(`public/uploads/${req.file.filename}`, callback);
            return res.status(400).json({ message: "Email already in use!!!" });
        }

        if (!parentphone.match(phoneregex)) {
            const callback = () => {
                console.log("Removed profile due to invalid registration credentials");
              };
              fs.unlink(`public/uploads/${req.file.filename}`, callback);
            return res.status(400).json({ message: "Enter a 10 digit valid Phone number!!!" });
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
            return res.status(400).json({ message: "Password should contain Minimum 8 charactersAt least one uppercase character,At least one lowercase character,At least one digit,At least one special character " });
        }

        const classname = await teacherModel.findById(teacherid);
        console.log("classnameteacher", classname.batch, "batchofstd", batch);
        if (classname.batch !== batch) {
            const callback = () => {
                console.log("Removed profile due to invalid registration credentials");
              };
              fs.unlink(`public/uploads/${req.file.filename}`, callback);
            return res.status(400).json({ message: "You have no right to add to this provided division" });
        }

        // Concatenate batchnumber and rollno as a single string
        const concatenatedRollno = `${batchnumber}${rollno}`;
        const studentbatchnumber = await parentModel.findOne({rollno:concatenatedRollno})
        if(studentbatchnumber)
        {
            const callback = () => {
                console.log("Removed profile due to invalid registration credentials");
              };
              fs.unlink(`public/uploads/${req.file.filename}`, callback);
            return res.status(400).json({ message: "batch number already taken" }); 
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newParent = new parentModel({
            studentname,
            parentname,
            email,
            password: hashedPassword,
            batch,
            address,
            status,
            parentphone,
            rollno: concatenatedRollno, // Store concatenated rollno here
            filename:req.file.filename
        });

        await newParent.save();
        res.status(200).json({ message: "Parent registration successful" });
    } catch (error) {
        console.log("Error faced", error);
        return res.status(400).json({ message: "Error in Parent Registration" });
    }
});


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
   return res.status(200).json({message:"Successfully logged-in",token:token,parentID:parent._id,parentName:parent.parentname,parentClass:parent.batch,parentprofile:parent.filename})
}
catch(error)
{
    return res.status(400).json({message:"Error in Parent Login!!!"})
}


})
//edit pic


router.put("/editpic/:parentID",Multerstore,async(req,res)=> {
    try {
     const {parentID} = req.params
      const parent = await parentModel.findById(parentID)
      if (!req.file) {
        return res.status(400).json({ message: "Please select a file" });
      }
     
      console.log("admin", parentID);
      console.log("userfile", req.file);
      const callback = (error) => {
        if (error) {
          console.log("Unable to delete ", error);
        } else {
          console.log("Successfully modified previous profile...");
        }
      };
      fs.unlink(`public/uploads/${parent.filename}`, callback);
      console.log("req.file.filename", req.file.filename);
      const data = await parentModel.findByIdAndUpdate(
        parentID,
        { filename: req.file.filename },
        { new: "true" }
      );
       res.status(200).json({ message: "profile successfully updated", parent: data });
    } catch (error) {
       res.status(400).json({message:"Unable to update profile"})
    }
  });
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
        const {studentname,parentname,email,batch,parentphone,status,address}=req.body
        const response= await parentModel.findByIdAndUpdate(id,{
            studentname,parentname,email,batch,parentphone,status
        })
        if(!studentname || !parentname || !email || !parentphone  || !status || !batch ||!address){
           return res.status(400).json({message:" All fields  are required"})
        }
        if (!parentphone.match(phoneregex)) {
          
            return res.status(400).json({ message: "Enter a 10 digit valid Phone number!!!" });
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