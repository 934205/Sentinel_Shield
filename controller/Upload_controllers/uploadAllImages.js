const supabase = require("../../config/supabase");
const multer = require("multer");
const AdmZip = require("adm-zip");
const path = require("path");

// Multer setup to accept a single ZIP file
const upload = multer({ storage: multer.memoryStorage() }).single("zipFile");

exports.Upload_Images_Zip = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    if (!req.file) return res.status(400).json({ success: false, error: "No file uploaded" });

    try {
      const zip = new AdmZip(req.file.buffer);
      const zipEntries = zip.getEntries();
      let updatedStudents = [];

      for (const entry of zipEntries) {
        if (entry.isDirectory) continue; // skip folders

        const fileName = path.parse(entry.entryName).name; // filename = reg_no
        const ext = path.extname(entry.entryName);
        const fileBuffer = entry.getData();

        const filePath = `user_images/${fileName}${ext}`;

        // Upload image to Supabase
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("user_image")
          .upload(filePath, fileBuffer, {
            contentType: "image/png", // or detect dynamically
            upsert: true,
          });

        if (uploadError) {
          console.error(`Failed to upload ${fileName}:`, uploadError);
          continue; // skip this file
        }

        // Get public URL
        const { data: publicData } = supabase.storage.from("user_image").getPublicUrl(filePath);
        const imageUrl = publicData.publicUrl;

        // Update student table
        const { data: studentData, error: studentError } = await supabase
          .from("student")
          .update({ face_url: imageUrl })
          .eq("reg_no", fileName);

        if (studentError) {
          console.error(`Failed to update DB for ${fileName}:`, studentError);
          continue;
        }

        updatedStudents.push({ reg_no: fileName, url: imageUrl });
      }

      return res.json({ success: true, updated: updatedStudents });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });
};
