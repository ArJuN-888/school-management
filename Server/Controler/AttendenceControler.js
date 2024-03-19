const AttendenceSchema= require("../Model/AttendenceSchema")

// this is for mark attendence of eanch student
const  Markattendence = async(req,res)=>{
    try {
        const {studentid,date,status}=req.body
        // Create attendence Record 

        if (!studentid || !date || !status){
            return res.status(400).json({message:"All fields are required...."})
        }

        const attendenceRecord=  new  AttendenceSchema({
            studentid,
            date,
            status

        })

         await attendenceRecord.save()
         return res.status(200).json({message:"Attendence marked Sucessful",markedstudentid:attendenceRecord.studentid})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"InTernal Error occured"})
    }
}
//to get the attendencec Record
const getattendenceRecord= async(req,res)=>{
    try {

        const attendenceRecord= await AttendenceSchema.find({ studentid:req.params.studentid})

        return res.status(200).json({message:attendenceRecord})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal error occured"})
        
    }
}
const checkAttendanceController = async (req, res) => {
    try {
      // Extract parameters from the request
      const { studentid, date } = req.query;
  
      // Query the database to check if attendance exists for the given studentid and date
      const attendanceRecord = await AttendenceSchema.findOne({ studentid, date });
  
      // Return the result indicating whether attendance exists
      res.json({ attendanceExists: !!attendanceRecord });
    } catch (error) {
      console.error("Error checking attendance:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports={
   Markattendence,
   getattendenceRecord,checkAttendanceController
}