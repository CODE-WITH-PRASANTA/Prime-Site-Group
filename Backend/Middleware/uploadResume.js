const multer = require("multer");
const path = require("path");
const fs = require("fs");

// backend/private-uploads/resumes  (do NOT serve this folder with express.static)
const UPLOAD_DIR = path.resolve(__dirname, "../../private-uploads/resumes");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED = {
  ".pdf": ["application/pdf"],
  ".doc": ["application/msword"],
  ".docx": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ALLOWED[ext] && ALLOWED[ext].includes(file.mimetype)) return cb(null, true);
  const err = new Error("Please upload a PDF, DOC, or DOCX file.");
  err.code = "INVALID_RESUME_TYPE";
  cb(err);
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter,
}).single("resume");

// Wrapper so upload errors come back in the shape the React form expects
const uploadResume = (req, res, next) => {
  upload(req, res, (err) => {
    if (!err) return next();

    let message = err.message || "Resume upload failed.";
    if (err.code === "LIMIT_FILE_SIZE") message = "Your resume must be smaller than 5 MB.";
    if (err.code === "LIMIT_UNEXPECTED_FILE") message = "Unexpected file field. Use 'resume'.";

    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: { resume: message },
    });
  });
};

module.exports = { uploadResume, UPLOAD_DIR };