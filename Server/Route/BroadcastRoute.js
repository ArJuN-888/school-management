const {broadMessModel} = require("../Model/BMessageSchema")
const {teacherModel} = require("../Model/TeacherSchema")
const {parentModel} = require("../Model/ParentShema")
const {staffModel} = require("../Model/StaffShema")
const express = require("express")
const router = express.Router()

//Create chat
router.post("/addbroadcast",async(req,res)=>{
    try{
        const {text,batch,status,teachername} = req.body
        const teacherid = req.query.teacherid && req.query.teacherid 
        const staffid = req.query.staffID && req.query.staffID 
        console.log("ids",teacherid,staffid)
        console.log("reqbodyofbc",req.body)
       if(!text || !batch || !teachername || !status)
       {
        return   res.status(400).json({message:"Empty fields..."})
       }
       
       const teacher = await teacherModel.findById(teacherid)
       const staff = await staffModel.findById(staffid)
      if(teacherid && teacher.batch !== batch)
      {
        console.log("teacherid",teacherid)
        return   res.status(400).json({message:"Invalid  batch..."})
      }
      if(staffid && staff.batch !== batch)
      {
        console.log("staffid",staffid)
        return   res.status(400).json({message:"Invalid  batch..."})
      }
        const newbroadcast = new broadMessModel({
           text,batch,status,teachername
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
      console.log("datafrombroad",data)
      if(data.length !== 0)
      {
        return res.status(200).json({bmess:data})
      }
       else 
       {
        return   res.status(200).json({message:"No messages available..."})
       }

}
    
   catch(error){
    res.status(400).json({message:"Unable to get"})
   }
})


module.exports = router