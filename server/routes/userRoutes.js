import express from "express";
import { changePassword, forgotPassword, login, logout, protect, signup } from "../controller/authController.js";
import { deleteUser, getAllUsers, getUser, updateUser, uploadUserPhoto } from "../controller/userController.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").get(logout);

router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").patch(forgotPassword);

router.use(protect);

router.route("/:usernameSlug").get(getUser);
router.route("/update-me").patch(uploadUserPhoto, updateUser);
router.route("/change-password").post(changePassword);

router.route("/").get(getAllUsers);
router.route("/:id").delete(deleteUser);

export default router;
