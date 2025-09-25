const supabase = require("../../config/supabase");

exports.update_timing = async (req, res, next) => {
  try {
    const body = req.body;
    const { dept_year_id } = req.query;

    if (!dept_year_id) {
      return res.status(400).json({
        success: false,
        message: "Missing dept_year_id in query",
      });
    }

    // Merge dept_year_id from query to the body
    const timingData = { ...body, dept_year_id };

    // UPSERT: insert or update if dept_year_id exists
    const { data, error } = await supabase
      .from("timing")
      .upsert(timingData, { onConflict: ["dept_year_id"] }) // use upsert instead of insert+eq
      .select();

    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.json({
      success: true,
      message: `Timing record for dept_year_id=${dept_year_id} inserted/updated successfully`,
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
