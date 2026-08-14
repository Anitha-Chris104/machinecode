import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Allow images
  if (file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }

  // Allow PDF
  if (file.mimetype === "application/pdf") {
    return cb(null, true);
  }

  // Reject other files
  cb(new Error("Only images and PDF files are allowed."), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

export default upload;
