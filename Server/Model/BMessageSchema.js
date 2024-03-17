const mongoose = require("mongoose")
const broadcastSchema = new mongoose.Schema({
text:{type:String,required:"true"},
batch:{type:String,required:"true"},
teachername:{type:String,required:"true"},
status:{type:String,required:"true"}
},{
    timestamps:true
})
const broadMessModel = mongoose.model("Broadcastmessage",broadcastSchema)
module.exports = {broadMessModel}