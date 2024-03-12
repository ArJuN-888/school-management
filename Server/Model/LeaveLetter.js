const mongoose=require('mongoose')


const leaveSchema=new mongoose.Schema({
    studentname:{type:String,required:true,unique:true},
    rollno:{type:Number,required:true},
    days:{type:Number,required:true},
    startdate:{type:Date,required:true},
    reason:{type:String,required:true},
    studentclass:{type:String,required:true},
    parentid:{type:mongoose.Schema.Types.ObjectId,ref:"parents",required:true},
    grant:{type:Boolean,default:false}
})

const leaveModel=mongoose.model("leave letters",leaveSchema)


module.exports={leaveModel}