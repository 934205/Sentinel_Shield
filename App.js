const express = require('express')
const app = express()
const dotenv=require('dotenv')
const path = require('path')
dotenv.config({path: path.join(__dirname,'config','config.env')})
const supabase = require('./config/supabase')

const cors = require('cors');
app.use(cors())

app.use(express.json());  // Required to parse JSON data
app.use(express.urlencoded({ extended: true })); // For URL-encoded data
app.use("/public", express.static(path.join(__dirname, "public")));


// for Uploading data
const upload_dept_year_route = require('./routes/Upload_routes/dept_year')
app.use('/api',upload_dept_year_route)

const upload_advisor_route = require('./routes/Upload_routes/advisor')
app.use('/api',upload_advisor_route)

const upload_student_routes = require('./routes/Upload_routes/student')
app.use('/api',upload_student_routes)

const upload_timing_routes = require('./routes/Upload_routes/timing')
app.use('/api',upload_timing_routes)


// for Displaying data
const display_student_routes = require('./routes/Display_routes/Student') 
app.use('/api',display_student_routes)

const display_advisor_routes =require('./routes/Display_routes/Advisor')
app.use('/api',display_advisor_routes)

const display_schedule_routes = require('./routes/Display_routes/Schedule')
app.use('/api',display_schedule_routes)


// for Updating data
const update_advisor = require('./routes/Update_routes/Advisor')
app.use('/api',update_advisor)

const update_student = require('./routes/Update_routes/Student')
app.use('/api',update_student)

// for attendance
const fetch_attendance = require('./routes/Attendance_routes/Attendance')
app.use('/api',fetch_attendance)

// for departmets
const fetch_departments = require('./routes/Department_routes/Fetch_departments')
app.use('/api',fetch_departments)

// for login
const login = require('./routes/Login_routes/Login')
app.use('/api',login)


// Profile
const profile=require('./routes/Display_routes/Profile')
app.use('/api',profile)

// Display students inside campus
const StudentsInsideCampus = require('./routes/Display_routes/DisplayInsideCampus')
app.use('/api',StudentsInsideCampus)

// for image upload 
const upload_image_routes = require("./routes/Upload_routes/image");
app.use("/api", upload_image_routes);

// for image upload 
const upload_all_image_routes = require("./routes/Upload_routes/Allimages");
app.use("/api", upload_all_image_routes);

// for update timing 
const update_timing = require("./routes/Update_routes/Schedule");
app.use("/api", update_timing);

// for display hod 
const display_hod = require("./routes/Display_routes/Hod");
app.use("/api", display_hod);


app.listen(process.env.PORT||5000, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});



