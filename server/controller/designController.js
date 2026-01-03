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
  const { pageSize = 100, page = 0 } = req.params;

  const skip = Number(page) * Number(pageSize);

  const designAggregation = [
    { $sort: { createdAt: -1 } }, // Optional: Sort by newest first (adjust as needed)
    { $skip: skip },
    { $limit: Number(pageSize) },
    {
      $lookup: {
        from: "users", // Lowercase collection name
        localField: "likesUsers",
        foreignField: "_id",
        as: "likesUsers", // Replace array of IDs with populated users
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner", // Populate owner (array, but single)
      },
    },
    { $unwind: "$owner" }, // Convert owner array to single object
    {
      $project: {
        // Optional: Select specific fields to return (adjust as needed)
        name: 1,
        description: 1,
        images: 1,
        colors: 1,
        gradients: 1,
        ratingCount: 1,
        rating: 1,
        likesCount: 1,
        tags: 1,
        createdAt: 1,
        updatedAt: 1,
        owner: {
          _id: 1,
          username: 1,
          firstName: 1,
          lastName: 1,
          picture: 1,
          // Add more owner fields if needed
        },
        likesUsers: {
          $map: {
            input: "$likesUsers",
            as: "user",
            in: {
              _id: "$$user._id",
              username: "$$user.username",
              firstName: "$$user.firstName",
              lastName: "$$user.lastName",
              picture: "$$user.picture",
              // Add more user fields if needed
            },
          },
        },
      },
    },
  ];
  const designs = await Design.aggregate(designAggregation);

  res.status(200).json({ status: "success", total: designs.length, data: designs });
});

export const getDesign = catchAsync(async (req, res, next) => {
  const design = await Design.findById(req.params.id);
  if (!design) return next(new appError("No Design found with this id!", 404));
  res.status(200).json({ status: "success", data: design });
});

export const updateDesign = catchAsync(async (req, res, next) => {
  const updatedDesign = await Design.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updatedDesign) return next(new appError("No Design found with this id!", 404));
  res.status(200).json({ status: "success", data: updatedDesign });
});

export const deleteDesign = catchAsync(async (req, res, next) => {
  const design = await Design.deleteMany(req.params.id);
  if (!design) return next(new appError("No Design found with this id!", 404));
  res.status(204).json({ status: "success", data: null });
});

export const deleteDesigns = catchAsync(async (req, res, next) => {
  const designs = await Design.deleteMany({ _id: { $in: req.body.designIDs } });
  if (designs.length === 0) return next(new appError("No Design found with this id!", 404));
  res.status(204).json({ status: "success" });
});
