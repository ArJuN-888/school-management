const mongoose=require('mongoose')


const parentSchema=new mongoose.Schema({
    studentname:String,
    parentname:String,

    rollno:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true
    },
    batch:String,

    address:String,
  
    status:String,
    parentphone:{type:String,required:"true"},
    password:{type:String,required:"true"},
    filename:{type:String,required:true}
},{strict:true,timestamps:true});

const parentModel=mongoose.model("parents",parentSchema)


module.exports={parentModel}