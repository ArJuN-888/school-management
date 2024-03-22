const mongoose = require("mongoose")
const studySchema = new mongoose.Schema({
    userID:{type:String,required:true},
    filename:{type:String,required:true},
    subject:{type:String,required:true},
    note:{type:String,required:true},
    link:{type:String},
    status:{type:String,required:true}
},
{
    timestamps:true
})
const studyModel=mongoose.model("material",studySchema)

module.exports={studyModel}