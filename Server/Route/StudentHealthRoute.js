const express= require("express")

const StudentHealthControler= require("../Controler/StudentHealthControler")

const healthRoute= express.Router()

healthRoute.post("/Add",StudentHealthControler.Addrecord)
healthRoute.get("/View",StudentHealthControler.Getrecord)

module.exports=healthRoute