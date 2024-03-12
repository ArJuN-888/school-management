const express=require("express")
const router=express.Router()
const {leaveModel}=require('../Model/LeaveLetter.js')

router.post('/add',async(req,res)=>{
    try
    {
        const{studentname,rollno,days,startdate,reason,studentclass,parentid}= req.body

        if(!parentid)
        {
            return res.status(400).json({message:"Parent Login Required"})
        }
        if(!studentname || !rollno || !days || startdate || !reason || !studentclass)
        {
            return res.status(400).json({message:"All Fields are Mandatory"})
        }
        const leave= new leaveModel({studentname,rollno,days,startdate,reason,studentclass,parentid})
        await leave.save()
        return res.json({message:"Leave Letter Submitted Successfully.."})
    }
    catch(error)
    {
        return res.status(400).json({message:"Unable To Send Leave Letter"})
    }
})

router.get('/getallletters',async(req,res)=>{
    try{
    const allLetters=await leaveModel.find({})
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