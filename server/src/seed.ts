import mongoose from "mongoose";
import User from "./models/user.model";
import { env } from "./config/env";

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(env.MONGODB_URI!);
    console.log("Connected successfully.");

    console.log("Clearing existing users (optional, commented out)...");
    // await User.deleteMany({}); // Uncomment to wipe existing users

    console.log("Creating 20 fake users...");
    const fakeUsers = [];
    for (let i = 1; i <= 20; i++) {
      fakeUsers.push({
        username: `testuser${i}`,
        fullName: `Test User ${i}`,
        email: `test${i}@batiyoun.local`,
        password: "password123", // Will be hashed by pre-save hook in model
      });
    }

    // Insert individually to trigger any pre-save hooks (like password hashing)
    for (const userData of fakeUsers) {
      const user = new User(userData);
      await user.save();
    }

    console.log("Successfully seeded 20 users!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
