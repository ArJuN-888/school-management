const mongoose= require("mongoose")

const Model= new mongoose.Schema({
    studenentid:String,
    studentname:String,
    age:Number,
    batch:String,
    Immunization:String,
    Vision:String,
    Hearing:String,
    MentalHealth:String,
    PhysicalExamination:String,
    NutritionStatus:String,
    weight:String,
    height:String,
    Finalreport:String,
})

const HealthSchema= mongoose.model("HealthSchema",Model)

module.exports= HealthSchema