const express = require("express")
const {studyModel} = require("../Model/StudymaterialSchema")
const Multerstore = require("../Config/MulterConfig")
const router = express.Router()

router.post("/post",Multerstore,async(req,res)=>{
    try{
   const {userID,status,note,subject,link} = req.body
   if(!userID|| !note || !status || !subject)
     {
      return   res.status(400).json({message:"Empty fields..."})
     }
   const response = new studyModel({userID,filename:req.file.filename,status,note,subject,link})
   await response.save()
    res.status(200).json({message:"Successfully added an announcement"})
    }
    catch(error){
     res.status(400).json({message:"Unable to create"})
    }
})
router.get("/gatherpost",async(req,res)=>{
    try{
    const material = await studyModel.find({})
    console.log("dfg",material)
    res.status(200).json({studymaterial:material})
    }
    catch(error){
        res.status(400).json({message:"Unable to fetch"})
    }
})
module.exports = router