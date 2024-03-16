const {broadMessModel} = require("../Model/BMessageSchema")
const {teacherModel} = require("../Model/TeacherSchema")
const {parentModel} = require("../Model/ParentShema")
const express = require("express")
const router = express.Router()

//Create chat
router.post("/broadcast",async(req,res)=>{
    try{
        const {text,batch} = req.body
        const teacherid = req.query.teacherid
       if(!text || !batch)
       {
        return   res.status(400).json({message:"Empty fields..."})
       }
       const teacher = await teacherModel.findById(teacherid)
      if(teacher.batch !== batch)
      {
        return   res.status(400).json({message:"Invalid  batch..."})
      }
        const newbroadcast = new broadMessModel({
           text,batch
        })
        await newbroadcast.save()
     res.status(200).json({message:"Successfully send.."})
    }
   catch(error){
    res.status(400).json({message:"Unable to create"})
   }
})
//getuserchats
router.get("/allbroadcastmess",async(req,res)=>{

try{
    const parentID = req.query.parentid
    const parent = await parentModel.findById(parentID)
      const data = await broadMessModel.find({
        batch: {$in : parent.batch }
      })
      if(data)
      {
        return res.status(200).json({bmess:data})
      }

    return   res.status(200).json({message:"No messages available..."})
}
    
   catch(error){
    res.status(400).json({message:"Unable to get"})
   }
})


module.exports = router