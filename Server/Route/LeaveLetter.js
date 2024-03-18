const express=require("express")
const router=express.Router()
const {leaveModel}=require('../Model/LeaveLetter.js')

router.post('/add', async (req, res) => {
    try {
        const { studentname, rollno, days, startdate, reason, studentclass, parentid, grant } = req.body;

        console.log("Received request with body:", req.body);

        if (!parentid) {
            return res.status(400).json({ message: "Parent ID is required" });
        }

        if (!studentname || !rollno || !days || !startdate || !reason || !studentclass ) {
            return res.status(400).json({ message: "All Fields are Mandatory" });
        }


        const leave = new leaveModel({ studentname, rollno, days, startdate, reason, studentclass, parentid, grant });
        await leave.save();
        return res.json({ message: "Leave Letter Submitted Successfully.." });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(400).json({ message: "Unable To Send Leave Letter" });
    }
});


router.get('/getletters',async(req,res)=>{
    try{
    const cls = req.query.clue
    console.log("mark",cls);
    const allLetters=await leaveModel.find({studentclass:cls})
    console.log("lettr",allLetters);
    return res.status(200).send(allLetters)
    }
    catch(err)
    {
        return res.status(400).json({message:"error in fetching all letters"})
    }
})


router.get('/getletter/:id',async(req,res)=>{
    try{
    const {id}=req.params
    console.log("mark",id);
    const allLetters=await leaveModel.find({parentid:id})
    console.log("mylet",allLetters);
    return res.status(200).send(allLetters)
    
    }
    catch(err)
    {
        return res.status(400).json({message:"error in fetching all letters"})
    }
})

router.put("/grant/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const{grant}=req.body;
        await leaveModel.findByIdAndUpdate(id,{grant})
        if (grant === true) 
        {
            return res.status(200).json({ message: "Successfully Granted Leave"});
        } 
        else 
        {
            return res.status(200).json({ message: "Successfully Refused Leave"});
        }
    }
    catch(err){
        return res.status(400).json({ message: "Error Setting Grant Property "});
    }

})

module.exports = router