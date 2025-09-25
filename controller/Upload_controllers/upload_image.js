const supabase = require("../../config/supabase");
const path = require("path");

exports.Upload_Image = async (req, res) => {
  const { reg_no } = req.query;

  if (!reg_no) return res.status(400).json({ success: false, error: "Missing reg_no" });
  if (!req.file) return res.status(400).json({ success: false, error: "No file uploaded" });
  console.log(reg_no);
  console.log(req.file);
  
  

  try {
    // Use timestamp to create unique filename
    const ext = path.extname(req.file.originalname); // keep original extension
    const timestamp = Date.now();
    const fileName = `${reg_no}_${timestamp}${ext}`;
    const filePath = `user_images/${fileName}`;

    // Upload new file
    const { error: uploadError } = await supabase.storage
      .from("user_image")
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true // if same filename exists, it will replace, otherwise new file
      });
    if (uploadError) throw uploadError;

    // Get public URL
    const { data: publicData } = supabase.storage
      .from("user_image")
      .getPublicUrl(filePath);

    const imageUrl = publicData.publicUrl;

    // Update student table with new URL
    const { data: studentData, error: studentError } = await supabase
      .from("student")
      .update({ face_url: imageUrl })
      .eq("reg_no", reg_no);
    if (studentError) throw studentError;

    // Return new URL
    return res.json({ success: true, url: imageUrl, student: studentData });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
