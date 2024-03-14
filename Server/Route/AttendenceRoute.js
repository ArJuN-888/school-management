const express = require("express")

const AttendenceControler = require("../Controler/AttendenceControler")

const attendenceRoute= express.Router()

attendenceRoute.post("/attendencemark",AttendenceControler.Markattendence)
attendenceRoute.get("/attendence/:studentid",AttendenceControler.getattendenceRecord)

module.exports= attendenceRoute