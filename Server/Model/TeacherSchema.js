const mongoose=require('mongoose')


const teacherSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    classname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}, 
    status:{type:String,required:true}
})


const teacherModel=mongoose.model("teachers",teacherSchema)

module.exports={teacherModel}
