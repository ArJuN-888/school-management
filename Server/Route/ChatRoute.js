const chatmodel = require("../Model/ChatSchema")
const express = require("express")
const router = express.Router()

//Create chat
router.post("/",async(req,res)=>{
    try{
        const {firstId,secondId} = req.body
        const chatexist = await chatmodel.findOne({
            members:{$all:[firstId,secondId]}
        })
        if(chatexist)
        {
            return   res.status(200).json(chatexist)
        }
        const newChat = new chatmodel({
            members:[firstId,secondId]
        })
        const response = await newChat.save()
     res.status(200).json(response)
    }
   catch(error){
    res.status(500).json({message:"Unable to create",error})
   }
})
//getuserchats
router.get("/:userId",async(req,res)=>{

       const userId = req.params.userId;
try{
    const chats = await chatmodel.find({
    members:{$in:[userId]}
    })
    console.log("chatsgetuser",chats)
    return   res.status(200).json(chats)
}
    
   catch(error){
    res.status(500).json({message:"Unable to get",error})
   }
})
//findchat(1)
router.get("/find/:firstId/:secondId",async(req,res)=>{

    const {firstId,secondId} = req.params
try{
 const chats = await chatmodel.findOne({
    members:{$all:[firstId,secondId]}
 })
 return   res.status(200).json(chats)
}
 
catch(error){
 res.status(500).json({message:"Unable to get",error})
}
})
module.exports = router