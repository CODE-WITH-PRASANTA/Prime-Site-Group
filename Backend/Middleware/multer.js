
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

// Backend/uploads directory
const uploadDir = path.resolve(__dirname, "../uploads");

// Create uploads directory automatically
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Allowed image formats
const allowedMime = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

// Validate uploaded images
const fileFilter = (req, file, cb) => {
  if (allowedMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file format. Only JPG, JPEG, PNG, WEBP and SVG allowed."
      )
    );
  }
};

// Use memory storage before processing
const storage = multer.memoryStorage();

const multerUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});

// Supported upload fields
const uploadFields = multerUpload.fields([
  { name: "logo", maxCount: 1 },
  { name: "profileImage", maxCount: 1 },
  { name: "avatarFile", maxCount: 1 },
  { name: "avatar", maxCount: 1 },
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

// Generate unique filename
const generateFilename = () => {
  return `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
};

// Convert images and save them
const processImages = async (req, res, next) => {
  const savedFiles = [];

  try {
    if (!req.files) {
      return next();
    }

    for (const fieldName of Object.keys(req.files)) {
      for (const file of req.files[fieldName]) {
        const originalExt = path
          .extname(file.originalname)
          .toLowerCase();

        const shouldConvert = [
          ".jpg",
          ".jpeg",
          ".png",
        ].includes(originalExt);

        let outputBuffer;
        let outputExt;
        let outputMime;

        if (shouldConvert) {
          // Convert JPG / JPEG / PNG to WebP
          outputBuffer = await sharp(file.buffer)
            .rotate()
            .webp({ quality: 80 })
            .toBuffer();

          outputExt = ".webp";
          outputMime = "image/webp";
        } else {
          // Keep existing WebP and SVG unchanged
          outputBuffer = file.buffer;
          outputExt = originalExt;
          outputMime = file.mimetype;
        }

        const filename = `${generateFilename()}${outputExt}`;
        const filePath = path.join(uploadDir, filename);

        await fs.promises.writeFile(filePath, outputBuffer);

        savedFiles.push(filePath);

        // Update Multer file information for controllers
        file.filename = filename;
        file.destination = uploadDir;
        file.path = filePath;
        file.mimetype = outputMime;
        file.size = outputBuffer.length;

        // Release memory buffer
        delete file.buffer;
      }
    }

    next();
  } catch (error) {
    // Remove partially saved files if processing fails
    await Promise.all(
      savedFiles.map((filePath) =>
        fs.promises.unlink(filePath).catch(() => {})
      )
    );

    next(error);
  }
};

// Final upload middleware
const upload = (req, res, next) => {
  uploadFields(req, res, (error) => {
    if (error) {
      return next(error);
    }

    processImages(req, res, next);
  });
};

module.exports = upload;
