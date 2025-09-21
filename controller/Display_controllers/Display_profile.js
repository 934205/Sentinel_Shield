const supabase = require("../../config/supabase");

exports.Display_Profile = async (req, res) => {
    
    try {

        let query = supabase
            .from("advisor")
            .select("advisor_id, name, mobile_number,dept_year_id, dept_years!inner(dept_name, dept_year)")
            .eq("dept_year_id",req.user.dept_year_id); // Ensure inner join


        const { data, error } = await query;
        console.log(error);
        

        if (error) {
            return res.status(500).json({ message: "Error fetching data", success: false, error: error.message });
        }
        return res.json({ success: true, advisors: data });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: error.message, success: false });
    }
};
