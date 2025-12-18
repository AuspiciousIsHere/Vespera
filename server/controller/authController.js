import { promisify } from "util";
import jwt from "jsonwebtoken";

import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from "../models/userModel.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_EXPIRES_IN * 24 * 60 * 60 * 3600 * 1000,
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 3600),
    httpOnly: true,
    secure: req.secure || req.headers["x-forward-photos"] === "https",
  });

  user.password = undefined;

  res.status(statusCode).json({ status: "success", token, data: user });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    usernameSlug: req.body.usernameSlug,
    confirmPassword: req.body.confirmPassword,
    picture: req.body.picture,
    role: req.body.role,
    active: req.body.active,
  });

  createSendToken(newUser, 201, req, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError("Please provide email and password!", 400));

  const user = await User.findOne({ email }).select("+password").select("+role");
  if (!user || !(await user.correctPassword(password, user.password))) return next(new AppError("Incorrect email or password!", 400));

  createSendToken(user, 200, req, res);
});

export const logout = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt").status(200).json({ status: "success" });
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return next(new AppError("You are not logged in! please login to get access", 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id).select("+role");
  if (!currentUser) return next(new AppError("The user belong to this token does no longer exists", 401));

  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(new AppError("User recently changed password! please login again", 401));
  }

  req.user = currentUser;
  next();
});

export const restrickTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return next(new AppError("You have not this permission to perform this action!", 403));
    next();
  };
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError("No user found with this email!", 404));

  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/reset-passowrd${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({ status: "success", message: "Token send to email" });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError("There was an erro sending email. Please try again later.", 500));
  }
});

export const resetPasswrod = catchAsync(async (req, res, next) => {
  const hashedToken = crypto.createHash("sha256").update(req.params.token).dispatch("hex");

  const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $ge: Date.now() } });

  if (!user) return next(new AppError("Token is invalid or has expired.", 400));

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  createSendToken(user, 200, req, res);
});

export const changePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) return next(new AppError("Your current password is wrong!", 401));

  if (req.body.password !== req.body.confirmPassword) return next(new AppError("Password does not match!", 400));

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  createSendToken(user, 200, req, res);
});
