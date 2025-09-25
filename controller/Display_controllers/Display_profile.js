const supabase = require("../../config/supabase");

exports.Display_Profile = async (req, res) => {
  let user = req.user;
  console.log(user);
  

  try {
    let query 

    // Apply filtering based on user type
    if (user.dept_year_id) {
        query = supabase
        .from("advisor")
        .select("advisor_id, name, mobile_number,role, dept_year_id, dept_years!inner(dept_name, dept_year)")
        .eq("dept_year_id", user.dept_year_id)
        .eq("role",user.role)
                
    } else {
      query = supabase
        .from("advisor")
        .select("advisor_id, name, mobile_number, role")
        .eq("mobile_number", user.mobile_number);
    }

    const { data, error } = await query;
    console.log(data);
    

    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error fetching data",
        success: false,
        error: error.message,
      });
    }

    return res.json({ success: true, advisors: data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message, success: false });
  }
};
