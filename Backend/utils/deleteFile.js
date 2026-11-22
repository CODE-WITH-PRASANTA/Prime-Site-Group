
const fs = require("fs");
const path = require("path");

const uploadDir = path.resolve(__dirname, "../uploads");

const deleteFile = (fileName) => {
  if (!fileName) return;

  // Only accept stored filenames, not arbitrary paths
  if (path.basename(fileName) !== fileName) return;

  const filePath = path.join(uploadDir, fileName);

  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("File deletion error:", err.message);
      }
    });
  }
};

module.exports = deleteFile;
