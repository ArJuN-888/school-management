const mongoose=require('mongoose')


const teacherSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    batch:{type:String,required:true},
    batchnumber:{type:Number,required:true},
    password:{type:String,required:true},
    specialization:{type:String,required:true}, 
    status:{type:String,required:true}
})


const teacherModel=mongoose.model("teachers",teacherSchema)

module.exports={teacherModel}
