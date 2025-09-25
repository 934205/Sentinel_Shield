const supabase = require("../../config/supabase");

exports.Display_Schedule = async (req, res) => {
  try {
    const userRole = req.user.role; // dean, hod, advisor
    const { dept, year } = req.query; // optional query params



    let query = supabase
      .from("timing")
      .select(
        `monday_start_time, monday_end_time,
         tuesday_start_time, tuesday_end_time,
         wednesday_start_time, wednesday_end_time,
         thursday_start_time, thursday_end_time,
         friday_start_time, friday_end_time,
         saturday_start_time, saturday_end_time,
         dept_year_id,
         dept_years!inner(dept_name, dept_year)`
      );

    // Filter based on role
    if (userRole === "advisor") {
      query = query.eq("dept_year_id", req.user.dept_year_id);
    } else if (userRole === "hod") {

        const { data: deptData, error: deptError } = await supabase
        .from("dept_years")
        .select("dept_name")
        .eq("dept_year_id", req.user.dept_year_id)
        .single();

      if (deptError) {
        return res.status(500).json({ 
          message: "Error fetching HOD department", 
          success: false, 
          error: deptError.message 
        });
      }

      query = query.eq("dept_years.dept_name", deptData.dept_name);

      if (year && year !== "all") {
        query = query.eq("dept_years.dept_year", year);
      }


    } else if (userRole === "dean") {
      if (dept && dept !== "all") {
        query = query.eq("dept_years.dept_name", dept);
      }
      if (year && year !== "all") {
        query = query.eq("dept_years.dept_year", year);
      }
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ message: "Error fetching data", success: false, error: error.message });
    }

    return res.json({ success: true, schedule: data || [] });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
