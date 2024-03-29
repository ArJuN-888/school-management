const mongoose=require('mongoose')


const doctorSchema=new mongoose.Schema({
    
    username:{type:String,required:true,unique:true},
    qualification:{type:String,required:true},
    status:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    filename:{type:String,required:true},
    phone:{type:String,required:true}
    
})

const doctorModel=mongoose.model("doctors",doctorSchema)


module.exports={doctorModel}