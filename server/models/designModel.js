import mongoose from "mongoose";
const { Schema } = mongoose;

const designSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    images: [{ type: String, required: [true, "At least one image of the design is required"] }],
    colors: [{ type: String, uppercase: true, match: /^#[0-9A-F]{6}$/i }],
    gradients: [{ type: String, required: true }],
    ratingCount: { type: Number, default: 0, required: [true, "Rating Count is not provided"] },
    rating: { type: Number, default: 0, required: [true, "Rating is not provided"] },
    likesUsers: [{ type: mongoose.Types.ObjectId }],
    likesCount: { type: Number, default: 0 },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String, trim: true, lowercase: true }],
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Optional: Index for faster searches by colors or tags
designSchema.index({ colors: 1 });
designSchema.index({ tags: 1 });

const Design = mongoose.model("Design", designSchema);

export default Design;
