const messageModel = require("../Model/MessageSchema")
const express = require("express")
const router = express.Router()
//createmessage
router.post("/",async(req,res)=>{
    const {chatId,senderId,text} = req.body
    try{
   const message = new messageModel({chatId,senderId,text})
   const response = await message.save()
   res.status(200).json(response)
    }
    catch(error){
        res.status(500).json({message:"Unable to create message",error})
    }
})
//getmessages
router.get("/:chatId",async(req,res)=>{
    const {chatId} = req.params
    try{
   const messages = await messageModel.find({chatId})
   res.status(200).json(messages)
    }
    catch(error){
        res.status(500).json({message:"Unable to create message",error})
    }
})
module.exports = router