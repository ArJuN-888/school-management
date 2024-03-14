const mongoose=require('mongoose')


const parentSchema=new mongoose.Schema({
    studentname:String,
    parentname:String,
    classteacher:String,
    email:{
        type:String,
        required:true
    },
    batch:String,
    health:{
        type:String,
       
    },
    status:String,
    parentphone:Number,
    password:String,
},{strict:true,timestamps:true});

const parentModel=mongoose.model("parents",parentSchema)


module.exports={parentModel}