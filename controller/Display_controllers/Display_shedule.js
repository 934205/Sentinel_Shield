const supabase = require("../../config/supabase");

exports.Display_Schedule = async (req, res) => {
    try {

        let query = supabase
            .from("timing")
            .select("monday_start_time, monday_end_time,tuesday_start_time, tuesday_end_time, wednesday_start_time, wednesday_end_time, thursday_start_time , thursday_end_time , friday_start_time, friday_end_time, saturday_start_time, saturday_end_time,dept_year_id, dept_years!inner(dept_name, dept_year)")
            .eq("dept_year_id",req.user.dept_year_id); 

        
        const { data, error } = await query;
        

        if (error) {
            return res.status(500).json({ message: "Error fetching data", success: false, error: error.message });
        }
        return res.json({ success: true, schedule: data });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};
