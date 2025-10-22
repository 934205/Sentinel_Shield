const supabase = require("../../config/supabase");

exports.Display_student_inside_campus = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from("location_logs")
      .select(`
        reg_no,
        student:reg_no (
          name,
          gender,
          hosteller,
          mobile_number,
          emergency_mobile_number,
          dept_year_id,
          student_dept_year_id_fkey (
            dept_name,
            dept_year
          )
        )
      `)
      .eq("inside", true)
      .eq("date", today);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Flatten the data for easier frontend use
    const studentsInside = data.map(item => ({
      reg_no: item.reg_no,
      name: item.student.name,
      gender: item.student.gender,
      hosteller: item.student.hosteller,
      dept_year_id: item.student.dept_year_id,
      mobile_number: item.student.mobile_number,
      emergency_mobile_number: item.student.emergency_mobile_number,
      dept_name: item.student.dept_years?.dept_name || null,
      dept_year: item.student.dept_years?.dept_year || null,
    }));

    res.json(studentsInside);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
