const supabase = require("../../config/supabase");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

// 🔹 Helper to generate Excel and return download URL
async function generateExcel(data, fileName, req, res) {
    if (!data || data.length === 0) {
        return res.json({ success: false, message: "No attendance records found" });
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

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");

    const publicDir = path.join(__dirname, "..", "..", "public");
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

    const filePath = path.join(publicDir, fileName);
    XLSX.writeFile(wb, filePath);

    const downloadUrl = `${req.protocol}://${req.get("host")}/public/${fileName}`;
    return res.json({ success: true, url: downloadUrl });
}

// 🔹 Advisor
exports.Fetch_attendance_advisor = async (req, res) => {
    try {
        const dept_year_id = req.user.dept_year_id;
        const date = req.query.date;

        const { data, error } = await supabase
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
            .eq("date", date);

        if (error) throw error;

        const fileName = `Attendance_Advisor_${dept_year_id}_${date}.xlsx`;
        return generateExcel(data, fileName, req, res);

    } catch (error) {
        console.error("Advisor error:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 🔹 HOD
exports.Fetch_attendance_hod = async (req, res) => {
    try {
        const year = Number(req.query.year); // ensure number
        const date = req.query.date;

        const { data: deptData, error: deptError } = await supabase
            .from("dept_years")
            .select("dept_name")
            .eq("dept_year_id", req.user.dept_year_id)
            .single();

        if (deptError) throw deptError;

        const { data, error } = await supabase
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
            .eq("student.dept_years.dept_name", deptData.dept_name)
            .eq("student.dept_years.dept_year", year)
            .eq("date", date);

        if (error) throw error;

        const fileName = `Attendance_HOD_${deptData.dept_name}_${year}_${date}.xlsx`;
        return generateExcel(data, fileName, req, res);

    } catch (error) {
        console.error("HOD error:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 🔹 Dean
exports.Fetch_attendance_dean = async (req, res) => {
    try {
        const dept_name = req.query.dept;
        const year = Number(req.query.year);
        const date = req.query.date;

        const { data, error } = await supabase
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
            .eq("student.dept_years.dept_name", dept_name)
            .eq("student.dept_years.dept_year", year)
            .eq("date", date);

        if (error) throw error;

        const fileName = `Attendance_Dean_${dept_name}_${year}_${date}.xlsx`;
        return generateExcel(data, fileName, req, res);

    } catch (error) {
        console.error("Dean error:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};
