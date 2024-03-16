const mongoose = require("mongoose");

const model = new mongoose.Schema({
    studentid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    marks: [{
        subject: {
            type: String,
            required: true
        },
        scoredMark: {
            type: Number,
            required: true
        },
        totalMark: {
            type: Number,
            required: true
        }
    }],
   
});

const studentmarklistSchema = mongoose.model("studentmarklistSchema", model);

module.exports = studentmarklistSchema;
