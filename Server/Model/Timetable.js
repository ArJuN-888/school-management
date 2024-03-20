const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentTimetableSchema = new Schema({
    classN: {
        type: String,
        required: true
    },
    timetable: {
        Monday: [{
            type: String
        }],
        Tuesday: [{
            type: String
        }],
        Wednesday: [{
            type: String
        }],
        Thursday: [{
            type: String
        }],
        Friday: [{
            type: String
        }],
        Saturday: [{
            type: String
        }] 
    }
});

const StudentTimetable = mongoose.model('StudentTimetable', StudentTimetableSchema);

module.exports = {StudentTimetable};
