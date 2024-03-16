const express = require("express")

const marksheetControler = require("../Controler/marksheetControler")

const marksheetRoute= express.Router()

marksheetRoute.post("/",marksheetControler.addMark)
marksheetRoute.get("/list/:studentid",marksheetControler.getmark)

module.exports = marksheetRoute;