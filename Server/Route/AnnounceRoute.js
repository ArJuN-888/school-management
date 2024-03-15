const express = require("express")
const {announceModel} = require("../Model/AnnounceSchema")
const router = express.Router()

router.post("/post",async(req,res)=>{
    try{
   const {adminID,filename,status} = req.body
   if(!adminID || !filename || !status)
   {
      res.status(400).json({message:"Empty fields detected..."})
   }
   const response = new announceModel({adminID,filename,status})
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
    res.status(200).json({anouncement:announcement})
    }
    catch(error){
        res.status(400).json({message:"Unable to fetch"})
    }
})
module.exports = router