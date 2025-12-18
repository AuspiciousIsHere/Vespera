import catchAsync from "../utils/catchAsync.js";
import Design from "../models/designModel.js";
import appError from "../utils/appError.js";

export const createDesign = catchAsync(async (req, res, next) => {
  // 1) Handle Files
  if (req.files) {
    // Map the array of files to an array of filenames for the DB
    req.body.images = req.files.map((file) => file.filename);
  }

  // 2) Parse JSON strings back into Arrays/Objects
  if (req.body.colors) req.body.colors = JSON.parse(req.body.colors);
  if (req.body.gradientCss) req.body.gradientCss = JSON.parse(req.body.gradientCss);

  const newDesign = await Design.create({ ...req.body, ownerID: req.user.id });

  res.status(201).json({
    status: "success",
    data: newDesign,
  });
});

export const getDesigns = catchAsync(async (req, res, next) => {
  const userID = req.params.userID;
  console.log(userID);
  const designs = await Design.find();
  res.status(200).json({ status: "success", total: designs.length, data: designs });
});

export const getDesign = catchAsync(async (req, res, next) => {
  const design = await Design.findById(req.params.id);
  if (!design) return next(new appError("No Design found with this id!", 404));
  res.status(200).json({ status: "success", data: Design });
});

export const updateDesign = catchAsync(async (req, res, next) => {
  const updatedDesign = await Design.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updatedDesign) return next(new appError("No Design found with this id!", 404));
  res.status(200).json({ status: "success", data: updatedDesign });
});

export const deleteDesign = catchAsync(async (req, res, next) => {
  const design = await Design.findByIdAndDelete(req.params.id);
  if (!design) return next(new appError("No Design found with this id!", 404));
  res.status(204).json({ status: "success", data: null });
});
