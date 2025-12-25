// utils/uploadMiddleware.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/designs"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `design-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

// Use .array() because your frontend sends multiple images
export const uploadDesignImages = upload.array("images");
