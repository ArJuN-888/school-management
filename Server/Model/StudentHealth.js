const mongoose= require("mongoose")

const Model= new mongoose.Schema({
    studenentid:String,
    studentname:String,
    Immunization:String,
    Vision:String,
    Hearing:String,
    MentalHealth:String,
    PhysicalExamination:String,
    NutritionStatus:String
})

const HealthSchema= mongoose.model("HealthSchema",Model)

module.exports= HealthSchema