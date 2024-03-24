const mongoose=require('mongoose')


const parentSchema=new mongoose.Schema({
    studentname:String,
    parentname:String,

    rollno:{
        type:Number,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true
    },
    batch:String,
  
    status:String,
    parentphone:{type:String,required:"true"},
    password:{type:String,required:"true"},
},{strict:true,timestamps:true});

const parentModel=mongoose.model("parents",parentSchema)


module.exports={parentModel}