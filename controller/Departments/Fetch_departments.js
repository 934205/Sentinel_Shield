const supabase = require("../../config/supabase");

exports.Fetch_departments = async (req, res) => {
    try {
        const deptName = req.query.dept_name; // Get department name from query
        

        let query = supabase
            .from("dept_years")
            .select("*")
            

        const { data, error } = await query;

        if (error) {
            return res.status(500).json({ message: "Error fetching data", success: false, error: error.message });
        }

        const deptNames = [...new Set(data.map(item => item.dept_name))];
        const Years = [...new Set(data.map(item => item.dept_year))];

        return res.json({ success: true, departments: deptNames, years: Years, dept_with_years:data });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};
