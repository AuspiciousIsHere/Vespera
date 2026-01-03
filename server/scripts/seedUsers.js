import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import Design from "../models/designModel.js";
import User from "../models/userModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const designsImagesPath = path.join(__dirname, "../public/img/designs");

dotenv.config({ path: "./config.env", debug: true });

const getLocalDesignImages = () => {
  try {
    const files = fs.readdirSync(designsImagesPath);
    // Filter common image extensions
    const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    if (imageFiles.length === 0) {
      console.warn("No images found in /public/img/designs/");
    }
    return imageFiles;
  } catch (err) {
    console.error("Error reading designs images folder:", err);
    return [];
  }
};

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("DB connected for seeding...");

    const users = [];

    // Step 1: Create all 50 users first
    for (let i = 0; i < 50; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const password = "password";

      const user = await User.create({
        firstName,
        lastName,
        username: faker.internet.username({ firstName, lastName }).toLowerCase(),
        email: faker.internet.email({ firstName, lastName }),
        password,
        confirmPassword: password,
        bio: faker.lorem.sentence(),
        phone: faker.phone.number(),
        role: "user",
        active: true,
      });

      users.push(user);
      console.log(`Created user: ${user.username} (${user._id})`);
    }

    // Step 2: Assign designs (0 to 5 per user)
    for (const user of users) {
      const numDesigns = faker.number.int({ min: 0, max: 5 });
      const designIds = [];

      const localDesignImages = getLocalDesignImages();
      const numImages = faker.number.int({ min: 1, max: Math.min(3, localDesignImages.length) });
      const shuffled = [...localDesignImages].sort(() => 0.5 - Math.random());
      const selectedImages = shuffled.slice(0, numImages);

      const images = selectedImages.map((filename) => filename);

      for (let j = 0; j < numDesigns; j++) {
        const design = await Design.create({
          name: faker.commerce.productName(),
          description: faker.lorem.paragraph(),
          // images: [faker.image.url({ width: 800, height: 600 })],
          images,
          colors: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => faker.color.rgb({ format: "hex" }).toUpperCase()),
          gradients: [`linear-gradient(to right, ${faker.color.rgb({ format: "hex" })}, ${faker.color.rgb({ format: "hex" })})`],
          owner: user._id,
          tags: faker.lorem
            .words({ min: 2, max: 6 })
            .split(" ")
            .map((t) => t.toLowerCase()),
        });
        designIds.push(design._id);
      }

      if (designIds.length > 0) {
        user.designs = designIds;
        await user.save({ validateBeforeSave: false });
      }
    }

    // Step 3: Assign followers & following (0 to 50 each)
    for (const user of users) {
      const numFollowing = faker.number.int({ min: 0, max: Math.min(50, users.length - 1) });
      const followingIds = [];

      // Randomly select other users to follow
      const shuffled = [...users].sort(() => 0.5 - Math.random());
      for (let i = 0; i < numFollowing; i++) {
        const target = shuffled[i];
        if (target._id.toString() !== user._id.toString()) {
          followingIds.push(target._id);
        }
      }

      user.following = followingIds;

      // Update followers of the users being followed
      for (const followedId of followingIds) {
        const followedUser = users.find((u) => u._id.toString() === followedId.toString());
        if (followedUser && !followedUser.followers.includes(user._id)) {
          followedUser.followers.push(user._id);
        }
      }

      await user.save({ validateBeforeSave: false });
    }

    // Step 4: Assign random likes to designs (store user IDs in design.likesUsers)
    const designs = await Design.find();
    for (const design of designs) {
      const numLikes = faker.number.int({ min: 0, max: users.length - 1 });
      const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
      const likers = shuffledUsers.slice(0, numLikes).map((u) => u._id);

      design.likesUsers = likers;
      design.likesCount = likers.length;
      await design.save({ validateBeforeSave: false });
    }

    // Save all updated followers
    await Promise.all(users.map((u) => u.save()));

    console.log("Successfully seeded 50 users with:");
    console.log("- 0 to 5 designs each");
    console.log("- 0 to 50 followers & following each");
    console.log("- Realistic relationships (mutual references)");

    process.exit(0);
  } catch (err) {
    console.error("Users Seeding Error: ", err);
    process.exit(1);
  }
};

seedUsers();
