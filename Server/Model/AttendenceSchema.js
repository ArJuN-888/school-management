const  mongoose = require("mongoose")

const  model = new mongoose.Schema({
    studentid:{
        type:mongoose.Types.ObjectId,
        ref:"Student",
        required:true,
    },
    date:{
        type:String,
    },
    status:{
        type:String,
    },

})

const AttendenceSchema = mongoose.model("AttendenceSchema",model)

module.exports= AttendenceSchema