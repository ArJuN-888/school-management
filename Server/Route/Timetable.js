const express=require("express")
const router=express.Router()
const {StudentTimetable} = require('../Model/Timetable.js')



router.get('/gettable', async (req, res) => {
    try {
      const Tclass = req.query.Tclass
      const timetable = await StudentTimetable.find({classN:Tclass});
      res.json(timetable);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

router.get("/gettableP",async (req, res) => {
    try {
        const classN = req.query.Pclass
        const timetable = await StudentTimetable.find({classN});
        res.json(timetable);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})



router.post('/addtable', async (req, res) => {
  

  try {
      const { day, classN, periods } = req.body;

      const caseDay = day.toLowerCase()
      
      const existingTimetable = await StudentTimetable.findOne({ day:caseDay , classN });

      if (existingTimetable) {
          return res.status(200).json({ message: 'Timetable for this day and class already exists' });
      }

      const newTimetable = new StudentTimetable({ day, classN, periods });
      await newTimetable.save();

      res.status(201).json({ message: 'Timetable Added successfully' });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

  


router.delete('/delete/:id', async (req, res) => {
    const {id}= req.params;
  
    try {
      const timetable = await StudentTimetable.findOneAndDelete({ _id:id });
  
      if (!timetable) {
        return res.status(404).json({ message: 'Timetable not found' });
      }
  
      res.json({ message: 'Timetable deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



router.put('/updatetable/:id', async (req, res) => {
    const { id } = req.params;
    const {day, periods } = req.body;
    try {
      const updatedTimetable = await StudentTimetable.findByIdAndUpdate(id, { periods,day}, { new: true });
      res.json({message:"Timetable Updated Successfully..",updatedTimetable});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

module.exports = router