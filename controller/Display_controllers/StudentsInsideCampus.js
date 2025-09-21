const supabase = require("../../config/supabase");

exports.Display_student_inside_campus = async (req, res) => {
    
    try {
    // Call your Postgres function
    const { data, error } = await supabase.rpc('get_students_inside_campus');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data); // return the list of students inside campus
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
