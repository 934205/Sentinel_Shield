const supabase = require("../../config/supabase");


exports.update_advisor = async (req, res)=>{

    const updated_data = await req.body
    const advisor_id = await updated_data.advisor_id

    delete updated_data.advisor_id


    const { data, error } = await supabase
        .from("advisor")
        .update(updated_data)  // New value
        .eq("advisor_id", advisor_id)
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
