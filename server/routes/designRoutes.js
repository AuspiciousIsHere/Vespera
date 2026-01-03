import express from "express";

import { createDesign, deleteDesign, deleteDesigns, getDesign, getDesigns, updateDesign } from "../controller/designController.js";
import { protect } from "../controller/authController.js";
import { uploadDesignImages } from "../utils/uploadDesignImage.js";

const router = express.Router();

router.route("/").get(getDesigns).post(protect, uploadDesignImages, createDesign).delete(protect, deleteDesigns);
router.route("/:id").get(getDesign).patch(protect, updateDesign).delete(protect, deleteDesign);

export default router;
