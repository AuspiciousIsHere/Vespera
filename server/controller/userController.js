import catchAsync from "../utils/catchAsync.js";
import appError from "../utils/appError.js";
import User from "../models/userModel.js";

import multer from "multer";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/users");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `photo-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new appError("That's not an image! Please upload only images"));
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
export const uploadUserPhoto = upload.single("picture");

export const getAllUsers = catchAsync(async (req, res, next) => {
  let filters = {};
  let maxUsersValue = 0;

  if (req.user.role !== "admin") filters["role"] = { $ne: "admin" };
  if (req.query.username || req.query.username) {
    const { maxUsers, username } = req.query;

    if (username) filters["username"] = { $regex: username };
    if (maxUsers) maxUsersValue = maxUsers;
  }

  const users = await User.find(filters)
    .limit(maxUsersValue)
    .sort({ points: -1 })
    .select(req.query.isAdmin ? "+role" : "");

  res.status(200).json({ status: "success", total: users.length, data: users });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ usernameSlug: req.params.usernameSlug }).select(req.query.isAdmin ? "+role" : "");
  if (!user) return next(new appError("No user found with this username!", 404));
  res.status(200).json({ status: "success", data: user });
});

export const updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) return next(new appError("This route is not for password update!"));

  if (req.file) req.body.picture = req.file.filename;
  else req.body.photo = undefined;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true });
  if (!updatedUser) return next(new appError("No user found with this id!", 404));

  res.status(200).json({ status: "success", data: updatedUser });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndUpdate(req.params.id, { active: false }, { new: true, runValidators: true });

  if (!deletedUser) return next(new appError("No user found with this id!", 404));

  res.status(204).json({ status: "success" });
});
