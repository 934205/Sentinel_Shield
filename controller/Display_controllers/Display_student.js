const supabase = require("../../config/supabase");

exports.Display_all_dept_student = async (req, res) => {
    
    try {
        const { dept } = req.query
        const { year } = req.query
    

        let query = supabase
            .from("student")
            .select("reg_no, name, gender, mobile_number, emergency_mobile_number, hosteller,dept_year_id,face_url,dept_years!inner(dept_name,dept_year)")
    
        if (dept && dept !== "all") {
            query = query.eq("dept_years.dept_name", dept);
        }
        if(year && year !== "all"){
            query = query.eq("dept_years.dept_year", year);
        }

        const { data, error } = await query;

        if (error) {
            return res.json({ message: "Error fetching data", success: false, error: error.message });
        }
        return res.json({ success: true, students: data });
    } catch (error) {
        return res.json({ message: error.message, success: false });
    }
};


exports.Display_dept_student = async (req, res) => {
    
    try {
        const { year } = req.query
        const user=req.user        
                

        // First, get the dept_id of the logged-in user's dept_year
        const { data: deptName, error: deptError } = await supabase
        .from("dept_years")
        .select("dept_name")
        .eq("dept_year_id", user.dept_year_id)
        .single(); // .single() if you expect only one row        

        if (deptError || !deptName) {
            return res.json({ success: false, message: "User department not found" });
        }
        
        

        let query = supabase
            .from("student")
            .select("reg_no, name, gender, mobile_number, emergency_mobile_number, hosteller,dept_year_id,face_url,dept_years!inner(dept_name,dept_year)")
            .eq("dept_years.dept_name",deptName.dept_name)

        if(year && year!=="all"){
            query=query.eq("dept_years.dept_year",year)
        }
            

        const { data, error } = await query;
    
        

        if (error) {
            return res.json({ message: "Error fetching data", success: false, error: error.message });
        }
        return res.json({ success: true, students: data });
    } catch (error) {
        return res.json({ message: error.message, success: false });
    }
};




exports.Display_class_student = async (req, res) => {
    
    try {
        const user=req.user        
            console.log("HElo");
            
        let query = supabase
            .from("student")
            .select("reg_no, name, gender, mobile_number, emergency_mobile_number, hosteller,dept_year_id,face_url,dept_years!inner(dept_name,dept_year)")
            .eq("dept_year_id",user.dept_year_id)            

        const { data, error } = await query;

        if (error) {
            return res.json({ message: "Error fetching data", success: false, error: error.message });
        }
        return res.json({ success: true, students: data });
    } catch (error) {
        return res.json({ message: error.message, success: false });
    }
};


