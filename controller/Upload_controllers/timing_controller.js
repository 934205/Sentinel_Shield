const supabase = require("../../config/supabase");

exports.upload_timing = (req, res, next) => {
  const upload = async () => {
    try {
      let body = req.body;

      // attach dept_year_id from user
      body = { ...body, dept_year_id: req.user.dept_year_id };

      console.log(body);

      // UPSERT based on dept_year_id (primary key)
      const { data, error } = await supabase
        .from("timing")
        .upsert(body, { onConflict: ["dept_year_id"] }) 
        .select();

      if (error) {
        console.error(error);
        return res.json({
          success: false,
          message: error.message,
        });
      }

      return res.json({
        success: true,
        message: `Timing record for dept_year_id=${req.user.dept_year_id} inserted/updated successfully`,
        data,
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        message: error.message,
      });
    }
  };

  upload();
};
