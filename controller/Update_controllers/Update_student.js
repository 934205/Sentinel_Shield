const supabase = require("../../config/supabase");


exports.update_student = async (req, res)=>{

    const updated_data = await req.body
    const reg_no = await updated_data.old_reg_no

    delete updated_data.old_reg_no


    const { data, error } = await supabase
        .from("student")
        .update(updated_data)  // New value
        .eq("reg_no", reg_no)
        .select(); // Update student with reg_no 12345

    if (error) {
        res.json({
            success : false,
            message : "Data Updated Failed"
        })
    } else {
        res.json({
            success : true,
            message : "Data Updated Successful"
        })    }

}
