const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentTimetableSchema = new Schema({
    classN: {
        type: String,
        required: true
    },
    day: {
        type:String,
        required:true
    },
    periods: {
        type:[String]
        
    }
    
   
        
});

const StudentTimetable = mongoose.model('Timetable', StudentTimetableSchema);

module.exports = {StudentTimetable};
