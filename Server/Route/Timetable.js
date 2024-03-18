const express=require("express")
const router=express.Router()
const {StudentTimetable} = require('../Model/Timetable.js')

router.get("/gettable",async (req, res) => {
    try {
        const { Tname }= req.body
        const timetables = await StudentTimetable.find({Tname});
        res.json(timetables);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


router.post("/addtable",async (req, res) => {
    const { timetable, Tname } = req.body;

    const studentTimetable = new StudentTimetable({
        classteacher:Tname,
        timetable
    });

    try {
        const newStudentTimetable = await studentTimetable.save();
        res.status(201).json(newStudentTimetable);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.delete("/delete/:id",async (req, res) => {
    try {
        const {id}= req.params
        await StudentTimetable.findByIdAndDelete({_id:id});
        res.status(200).json({message:"Timetable Deleted Successfully"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


module.exports = router