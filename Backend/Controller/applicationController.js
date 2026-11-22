const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Application = require("../Model/Application");
const Career = require("../Model/Career");
const { UPLOAD_DIR } = require("../Middleware/uploadResume");

const STATUSES = ["New", "Reviewed", "Shortlisted", "Rejected"];

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
const removeFile = (filePath) => {
  if (filePath) fs.unlink(filePath, () => {});
};

/* POST /api/applications   (multipart/form-data, public) */
exports.createApplication = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: { resume: "Please upload your resume." },
      });
    }

    const { fullName, email, phone, position, careerId } = req.body;

    // Link to the job posting if it exists and is still active
    let career = null;
    if (careerId && isValidId(careerId)) {
      career = await Career.findOne({ _id: careerId, status: "Active" }).select("_id");
    }

    const application = await Application.create({
      fullName,
      email,
      phone,
      position,
      career: career ? career._id : null,
      resume: {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size,
      },
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      data: { id: application._id.toString() },
    });
  } catch (err) {
    removeFile(req.file?.path); // don't keep the file if saving failed

    if (err.name === "ValidationError") {
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors,
      });
    }

    next(err);
  }
};

/* GET /api/applications?search=&status=&page=1&limit=10   (admin) */
exports.getApplications = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const search = String(req.query.search || "").trim();
    const status = String(req.query.status || "").trim();

    const filter = {};
    if (STATUSES.includes(status)) filter.status = status;
    if (search) {
      const rx = new RegExp(escapeRegex(search), "i");
      filter.$or = [{ fullName: rx }, { email: rx }, { phone: rx }, { position: rx }];
    }

    const [total, applications] = await Promise.all([
      Application.countDocuments(filter),
      Application.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
    ]);

    res.json({
      success: true,
      data: applications,
      pagination: { total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) },
    });
  } catch (err) {
    next(err);
  }
};

/* PATCH /api/applications/:id/status   (admin) */
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id))
      return res.status(400).json({ success: false, message: "Invalid application id." });

    const { status } = req.body;
    if (!STATUSES.includes(status))
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${STATUSES.join(", ")}.`,
      });

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!application)
      return res.status(404).json({ success: false, message: "Application not found." });

    res.json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
};

exports.downloadResume = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id))
      return res.status(400).json({ success: false, message: "Invalid application id." });

    const application = await Application.findById(req.params.id);
    if (!application)
      return res.status(404).json({ success: false, message: "Application not found." });

    const filePath = path.join(UPLOAD_DIR, path.basename(application.resume.fileName));
    if (!fs.existsSync(filePath))
      return res.status(404).json({ success: false, message: "Resume file not found." });

    const asDownload = req.query.download === "1";
    const name = encodeURIComponent(application.resume.originalName);

    res.setHeader(
      "Content-Type",
      application.resume.mimeType || "application/octet-stream"
    );
    res.setHeader(
      "Content-Disposition",
      `${asDownload ? "attachment" : "inline"}; filename*=UTF-8''${name}`
    );
    res.sendFile(filePath);
  } catch (err) {
    next(err);
  }
};

/* DELETE /api/applications/:id   (admin) */
exports.deleteApplication = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id))
      return res.status(400).json({ success: false, message: "Invalid application id." });

    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application)
      return res.status(404).json({ success: false, message: "Application not found." });

    removeFile(path.join(UPLOAD_DIR, path.basename(application.resume.fileName)));
    res.json({ success: true, message: "Application deleted successfully." });
  } catch (err) {
    next(err);
  }
};