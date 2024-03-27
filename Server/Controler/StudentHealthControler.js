const HealthSchema = require("../Model/StudentHealth");

const Addrecord = async (req, res) => {
    try {
      const { studentid, studentname,batch,age,weight,height, Immunization, Vision, Hearing, MentalHealth, PhysicalExamination, NutritionStatus ,teacherreport,Finalreport} = req.body;
  
      // Check if any required field is missing
      if (!studentid || !studentname ||!batch ||!age ||!weight||!height|| !Immunization || !Vision || !Hearing || !MentalHealth || !PhysicalExamination || !NutritionStatus|| !teacherreport ||!Finalreport) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if a health record already exists for this student
      const healthRecordExists = await HealthSchema.findOne({ studentid });
      if (healthRecordExists) {
        return res.status(400).json({ message: "Health record already exists for this student" });
      }
  
      // Create a new Health record
      const Health = new HealthSchema({
        studentid,
        studentname,
        batch,
        age,
        Immunization,
        Vision,
        Hearing,
        MentalHealth,
        PhysicalExamination,
        weight,
        height,
        NutritionStatus,
        teacherreport,
        Finalreport
      });
  
      await Health.save();
      res.status(200).json({ message: "Successfully added Student Health Record" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Error Occurred" });
    }
  };


const Getrecord = async (req,res) => {
  try {
    const response= await HealthSchema.find({})
    return res.status(200).json({message:response})
  } catch (error) {
    console.log(error)
    res.status(400).json({message:"Internal error occured"})
  }
};

const Editrecord = async () => {};

module.exports = {
  Addrecord,
  Getrecord,
  Editrecord,
};
