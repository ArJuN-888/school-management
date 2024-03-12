const mongoose = require("mongoose")
const MessageSchema = new mongoose.Schema({
    chatId:String,
    senderId:String,
    text:String
},
{
    timestamps:true
})
const messageModel = mongoose.model("message",MessageSchema)
module.exports = messageModel