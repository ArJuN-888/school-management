const express = require("express")
const {announceModel} = require("../Model/AnnounceSchema")
const Multerstore = require("../Config/MulterConfig")
const router = express.Router()

router.post("/post",Multerstore,async(req,res)=>{
    try{
   const {adminID,status,note} = req.body

   const response = new announceModel({adminID,filename:req.file.filename,status,note})
   await response.save()
    res.status(200).json({message:"Successfully added an announcement"})
    }
    catch(error){
     res.status(400).json({message:"Unable to create"})
    }
})
router.get("/gatherpost",async(req,res)=>{
    try{
    const announcement = await announceModel.find({})
    console.log("dfg",announcement)
    res.status(200).json({announcement:announcement})
    }
    catch(error){
        res.status(400).json({message:"Unable to fetch"})
    }
})
module.exports = router