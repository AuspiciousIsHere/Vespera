import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
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
    cb(new AppError("That's not an image! Please upload only images"));
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
export const uploadUserPhoto = upload.single("picture");

export const getAllUsers = catchAsync(async (req, res, next) => {
  const { page = 1, pageSize = 10, search, sort, active } = req.query;

  let filters = {};

  if (req.user.role !== "admin") filters["role"] = { $ne: "admin" };

  // Global search (email, username or fullName)
  if (search) {
    filters.$or = [
      { username: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
    ];
  }

  // Active filter
  if (active !== undefined && active !== "all") {
    filters.active = active === "true";
  }

  // Sorting
  let sortStage = { createdAt: -1 };
  if (sort) {
    if (sort === "followers") {
      sortStage = { followersCount: 1 };
    } else if (sort === "-followers") {
      sortStage = { followersCount: -1 };
    } else if (sort === "following") {
      sortStage = { followingCount: 1 };
    } else if (sort === "-following") {
      sortStage = { followingCount: -1 };
    }
    // You can keep other sorts like "-createdAt" if needed
  }

  const skip = (Number(page) - 1) * Number(pageSize);

  const aggregation = [
    { $match: filters },
    {
      $addFields: {
        followersCount: { $size: { $ifNull: ["$followers", []] } },
        followingCount: { $size: { $ifNull: ["$following", []] } },
      },
    },
    { $sort: sortStage },
    { $skip: skip },
    { $limit: Number(pageSize) },
  ];

  const users = await User.aggregate(aggregation);
  const totalCount = await User.countDocuments(filters);

  res.status(200).json({ status: "success", total: totalCount, results: users.length, data: users });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ usernameSlug: req.params.usernameSlug }).select(req.query.isAdmin ? "+role" : "");
  if (!user) return next(new AppError("No user found with this username!", 404));
  res.status(200).json({ status: "success", data: user });
});

export const updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) return next(new AppError("This route is not for password update!"));

  if (req.file) req.body.picture = req.file.filename;
  else req.body.photo = undefined;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true }).select(
    req.user.role === "admin" ? "+role" : ""
  );
  if (!updatedUser) return next(new AppError("No user found with this id!", 404));

  res.status(200).json({ status: "success", data: updatedUser });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) return next(new AppError("No user found with this id!", 404));
  res.status(204).json({ status: "success" });
});

export const deleteUsers = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const deletedUsers = await User.deleteMany({ _id: { $in: req.body } });
  if (deletedUsers.length === 0) return next(new AppError("No user found to delete", 404));
  res.status(204).json({ status: "success" });
});

export const deleteAccount = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndUpdate(req.params.id, { active: false }, { new: true, runValidators: true });
  if (!deletedUser) return next(new AppError("No user found with this id!", 404));
  res.status(204).json({ status: "success" });
});

// Handle Login Notification Email
export const handleLoginNotif = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: { loginNotif: { $not: "$loginNotif" } } },
    { new: true, runValidators: true }
  );
  if (!updatedUser) return next(new AppError("No user found with this id!", 404));
  res.status(204).json({ status: "success", data: updatedUser });
});
