const supabase = require("../../config/supabase");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

exports.Fetch_attendance = async (req, res) => {
    try {
        const dept_year_id = req.user.dept_year_id; 
        const date=req.query.date
        console.log(date);
        

        let query = supabase
            .from("location_logs")
            .select(`
                reg_no,
                entry_time,
                exit_time,
                date,
                student!inner(
                name,
                dept_year_id,
                dept_years!inner(      
                    dept_name,
                    dept_year
                )
                )
            `)
            .eq("student.dept_year_id", dept_year_id)
            .eq("date",date)

        const { data, error } = await query;
        console.log(data);
        
        
        if (error) {            
            return res.json({ message: "Error fetching data", success: false, error: error.message });
        }

        const formattedData = data.map(item => ({
            "Register No": item.reg_no,
            "Student Name": item.student.name,
            "Department Name": item.student.dept_years.dept_name,
            "Year": item.student.dept_years.dept_year,
            "Date": item.date,
            "Entry Time": item.entry_time,
            "Exit Time": item.exit_time,
            
        }));



        // Create workbook
        const ws = XLSX.utils.json_to_sheet(formattedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Attendance");

        

        // Generate file name
        const fileName = `Attendance_${dept_year_id}_${date}.xlsx`;
        
        // Set headers for download
        res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

        // Write workbook to buffer and send
        const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
        res.send(buffer);
        
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

