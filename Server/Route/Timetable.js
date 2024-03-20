const express=require("express")
const router=express.Router()
const {StudentTimetable} = require('../Model/Timetable.js')

router.get("/gettable",async (req, res) => {
    try {
        const Tclass = req.query.Tclass
        const timetables = await StudentTimetable.find({classN:Tclass});
        res.json(timetables);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get("/gettableP",async (req, res) => {
    try {
        const Pclass = req.query.Pclass
        console.log("cls",Pclass);
        const timetables = await StudentTimetable.find({classN:Pclass});
        res.json(timetables);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post("/addtable",async (req, res) => {
    const { timetable, Tclass } = req.body;

    const studentTimetable = new StudentTimetable({
        classN:Tclass,
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

router.get("/gettable/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const timetable = await StudentTimetable.findById({_id:id});
        res.json(timetable);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/updatetable/:id", async (req, res) => {
    const { id } = req.params;
    const { timetable } = req.body;
    try {
        await StudentTimetable.findByIdAndUpdate(id, { timetable });
        res.status(200).json({ message: "Timetable updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router