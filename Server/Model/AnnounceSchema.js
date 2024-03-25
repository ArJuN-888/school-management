const mongoose = require("mongoose")
const announceSchema = new mongoose.Schema({
    adminID:{type:String,required:true},
    filename:{type:String,required:true},
    note:{type:String,required:true},
    status:{type:String,required:true},
},
{
    timestamps:true
})
const announceModel=mongoose.model("announcement",announceSchema)

module.exports={announceModel}