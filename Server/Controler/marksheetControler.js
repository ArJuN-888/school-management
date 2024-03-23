
const studentmarklistSchema = require("../Model/StudentmarklistSchema")
// const studentSchema = require("../Model/StudentsSchema")

const addMark = async (req, res) => {
    try {
        const { studentid,examname, marks } = req.body;

        if (!studentid  ||!examname ||!marks ) {
            return res.status(400).json({ message: "Invalid data provided" });
        }


        const studentMarkList = new studentmarklistSchema({
            studentid,
            examname,
            marks,
        });

        await studentMarkList.save();

        res.status(200).json({ message: "Student mark list added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getmark=async(req,res)=>{
    try {
        const marklist = await studentmarklistSchema.find({studentid:req.params.studentid})
        console.log(marklist)
        return res.status(200).json({message:marklist})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Internal Error occured !.."})
    }
}
module.exports={
    addMark,
    getmark
}