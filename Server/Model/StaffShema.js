const mongoose=require('mongoose')


const staffSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    batch:{type:String,required:true},
    specialization:{type:String,required:true}, 
    status:{type:String,required:true}
})


const staffModel=mongoose.model("staff",staffSchema)

module.exports={staffModel}
