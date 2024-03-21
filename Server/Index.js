const express = require("express");
const { DatabaseCon } = require("./Config/DB")
const cors = require("cors")
const doctorRoute = require("./Route/DoctorRoute.js")
const teacherRoute = require("./Route/TeacherRoute.js")
const  chatRoute = require("./Route/ChatRoute")
const messageRoute = require("./Route/MessageRoute")
const adminRoute = require('./Route/AdminRoute.js')
const parentRoute = require("./Route/ParentRoute.js")
const leaveRoute = require("./Route/LeaveLetter.js")
const broadcastRoute = require("./Route/BroadcastRoute.js")
const announcementShema = require("./Route/AnnounceRoute.js")
const attendenceRoute = require("./Route/AttendenceRoute.js")
const marksheetRoute = require("./Route/marklistRoute.js")
const timeRoute = require('./Route/Timetable.js')
const staffRoute = require("./Route/StaffRoute.js")
const studyRoute = require("./Route/StudyRoute.js")
const eoRoute = require("./Route/EoRoute.js")

const app = express();
const PORT = 5000;
app.use(express.json())
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,  // Enable CORS credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204,  // Respond with 204 No Content for preflight requests
  };
  
app.use(cors(corsOptions));
app.use(express.static("./public"));
//main Routes
app.use("/Doctor",doctorRoute)
app.use("/Admin",adminRoute)
app.use("/Teacher",teacherRoute)
app.use("/Parent",parentRoute)
app.use("/Chat",chatRoute)
app.use("/Message",messageRoute)
app.use("/Leave",leaveRoute)
app.use("/Announcement",announcementShema)
app.use("/attendence",attendenceRoute)
app.use("/Broadcast",broadcastRoute)
app.use("/marksheetadd",marksheetRoute)
app.use("/Timetable",timeRoute)
app.use("/Organization",eoRoute)
app.use("/Staff",staffRoute)
app.use("/Material",studyRoute)
// Start the HTTP server
app.listen(PORT, () => {
    console.log("Server started at", PORT);
});
