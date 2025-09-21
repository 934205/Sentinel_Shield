const supabase = require("../../config/supabase");

exports.Display_Advisor = async (req, res) => {
    
    try {

        let query = supabase
            .from("advisor")
            .select("advisor_id, name, mobile_number,dept_year_id, dept_years!inner(dept_name, dept_year)")


        const { data, error } = await query;
        

        if (error) {
            return res.status(500).json({ message: "Error fetching data", success: false, error: error.message });
        }
        return res.json({ success: true, advisors: data });
    } catch (error) {
        
        return res.status(500).json({ message: error.message, success: false });
    }
};
