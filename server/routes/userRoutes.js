import express from "express";
import { forgotPassword, login, logout, protect, resetPasswrod, signup, updatePassword } from "../controller/authController.js";
import {
  deleteAccount,
  deleteUser,
  deleteUsers,
  getAllUsers,
  getUser,
  handleLoginNotif,
  updateUser,
  uploadUserPhoto,
} from "../controller/userController.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").get(logout);

router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").patch(resetPasswrod);

router.use(protect);

router.route("/:usernameSlug").get(getUser);
router.route("/update-me").patch(uploadUserPhoto, updateUser);
router.route("/update-password").post(updatePassword);
router.route("/delete-account").post(deleteAccount);
router.route("/login-notif").post(handleLoginNotif);

router.route("/").get(getAllUsers).delete(deleteUsers);
router.route("/:id").delete(deleteUser);

export default router;
