import multer from "multer";

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"));
  }

  return cb(null, true);
};

const uploadCarTransactionImages = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 12,
  },
});

export default uploadCarTransactionImages;
