const mongoose = require("mongoose")
require("dotenv").config()
const DatabaseCon = mongoose.connect(process.env.DB_URI)
.then(()=>console.log("Database Connected Successfully"))
.catch((error)=>console.log("Unable to establish a connection",error))
module.exports = {
    DatabaseCon
}