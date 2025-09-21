const supabase = require("../../config/supabase");

exports.Fetch_departments = async (req, res) => {
    try {
        const deptName = req.query.dept_name; // Get department name from query
        

        let query = supabase
            .from("dept_years")
            .select("*"); // Ensure inner join

        const { data, error } = await query;

        if (error) {
            return res.status(500).json({ message: "Error fetching data", success: false, error: error.message });
        }
        return res.json({ success: true, departments: data });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};
