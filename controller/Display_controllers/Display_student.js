const supabase = require("../../config/supabase");

exports.Display_student = async (req, res) => {
    
    try {

        let query = supabase
            .from("student")
            .select("reg_no, name, gender, mobile_number, emergency_mobile_number, hosteller,dept_year_id,dept_years!inner(dept_name,dept_year)")
            .eq("dept_year_id",req.user.dept_year_id) // Ensure inner join
            

        const { data, error } = await query;

        if (error) {
            return res.json({ message: "Error fetching data", success: false, error: error.message });
        }
        return res.json({ success: true, students: data });
    } catch (error) {
        return res.json({ message: error.message, success: false });
    }
};
