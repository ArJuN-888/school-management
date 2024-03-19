const express = require("express")

const AttendenceControler = require("../Controler/AttendenceControler")

const attendenceRoute= express.Router()

attendenceRoute.post("/attendencemark",AttendenceControler.Markattendence)
attendenceRoute.get("/record/:studentid",AttendenceControler.getattendenceRecord)
attendenceRoute.get("/attendance/check",AttendenceControler.checkAttendanceController)

module.exports= attendenceRoute