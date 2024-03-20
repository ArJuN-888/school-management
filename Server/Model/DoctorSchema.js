const mongoose=require('mongoose')


const doctorSchema=new mongoose.Schema({
    
    username:{type:String,required:true,unique:true},
    qualification:{type:String,required:true,unique:true},
    status:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    
})

const doctorModel=mongoose.model("doctors",doctorSchema)


module.exports={doctorModel}