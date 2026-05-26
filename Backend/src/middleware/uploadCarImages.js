import fs from "fs";
import path from "path";

import multer from "multer";

const uploadRoot = path.resolve("uploads", "cars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const carId = req.params.id || "pending";
    const uploadDir = path.join(uploadRoot, carId);

    fs.mkdirSync(uploadDir, { recursive: true });

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase();

    cb(null, `${Date.now()}-${baseName}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"));
  }

  return cb(null, true);
};

const uploadCarImages = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 12,
  },
});

export default uploadCarImages;
