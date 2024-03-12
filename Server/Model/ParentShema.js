const mongoose=require('mongoose')


const parentSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    roll:{type:String,required:true,unique:true},
    studentname:{type:String,required:true},
    studentclass:{type:String,required:true},
    status:{type:String,required:true},
})

const parentModel=mongoose.model("parents",parentSchema)


module.exports={parentModel}