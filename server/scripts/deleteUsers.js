import cron from "node-cron";

import appError from "../utils/appError";
import User from "../models/userModel";

export const deleteUsersTask = () => {
  cron.schedule("*/3 * * * *", async () => {
    console.log("--------- CRON: Checking for deactivating users ---------");

    try {
      const results = await User.deleteMany({ active: false });

      if (results.deletedCount > 0) {
        console.log(`Cleanup success: ${results.deletedCount} users deleted`);
      }
    } catch (err) {
      return new appError("Users Cleanup Error: ", err);
    }
  });
};
