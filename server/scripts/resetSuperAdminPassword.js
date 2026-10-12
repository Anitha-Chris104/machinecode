import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";
import Admin from "../models/Admin.js";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const resetPassword = async () => {
  const rl = readline.createInterface({ input, output });

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from server/.env");
    }

    const email = "superadmin@machinecode.com";

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected database:", mongoose.connection.name);

    if (mongoose.connection.name !== "machinecode") {
      throw new Error(
        "Wrong database. Expected machinecode. No password was changed.",
      );
    }

    const admin = await Admin.findOne({ email });

    if (!admin || admin.role !== "superadmin") {
      throw new Error("Superadmin account not found.");
    }

    const password = await rl.question(
      "Enter your new password (input will be visible): ",
    );

    if (password.length < 12) {
      throw new Error("Use a password with at least 12 characters.");
    }

    const confirmPassword = await rl.question("Confirm your new password: ");

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    admin.password = await bcrypt.hash(password, 12);
    admin.resetPasswordToken = null;
    admin.resetPasswordExpires = null;

    await admin.save();

    console.log("Superadmin password reset successfully.");
  } catch (error) {
    console.error("Password reset failed:", error.message);
    process.exitCode = 1;
  } finally {
    rl.close();
    await mongoose.disconnect();
  }
};

resetPassword();
