const mongoose = require("mongoose")
const EoSchema = new mongoose.Schema(({
    email:{type:String,required:"true"},
    username:{type:String,required:"true"},
    organization:{type:String,required:"true"},
    password:{type:String,required:"true"},
    status:{type:String,required:"true"}
}))
const eoModel = mongoose.model("externalOrganization",EoSchema)
module.exports = {eoModel}