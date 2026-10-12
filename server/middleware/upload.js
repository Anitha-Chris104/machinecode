import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const allowedTypes = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/gif": [".gif"],
  "application/pdf": [".pdf"],
};

const fileFilter = (req, file, cb) => {
  const allowedExtensions = allowedTypes[file.mimetype];
  const extension = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions || !allowedExtensions.includes(extension)) {
    return cb(
      new Error("Only JPG, PNG, WEBP, GIF, and PDF files are allowed."),
    );
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB per file
    files: 11, // Up to 10 images + 1 brochure
  },
});

export default upload;
