const mongoose = require("mongoose");

const model = new mongoose.Schema({
    studentid: {
        type: String,
        required: true
    },
  
    examname:{
        type:String,
        required:true
    },
    marks: [{
        subject: {
            type: String,
            required:true
        },
        scoredMark: {
            type: Number,
        },
        totalMark: {
            type: Number,
        }
    }],
   
},
{
    timestamps:true
});

const studentmarklistSchema = mongoose.model("studentmarklistSchema", model);

module.exports = studentmarklistSchema;
