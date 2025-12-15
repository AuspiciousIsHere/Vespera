const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArtSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    colors: [{ type: String, uppercase: true, match: /^#[0-9A-F]{6}$/i }],
    gradients: [
      {
        css: { type: String, required: true },
        colors: [{ type: String }],
      },
    ],
    likes: { type: Number, default: 0, min: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String, trim: true, lowercase: true }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Optional: Index for faster searches by colors or tags
ArtSchema.index({ colors: 1 });
ArtSchema.index({ tags: 1 });

const Art = mongoose.model("Art", ArtSchema);

module.exports = Art;
