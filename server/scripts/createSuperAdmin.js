import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import Admin from "../models/Admin.js";

dotenv.config();

const rl = readline.createInterface({ input, output });

async function createSuperAdmin() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from server/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected database:", mongoose.connection.name);

    if (mongoose.connection.name !== "machinecode") {
      throw new Error(
        "Wrong database. Expected machinecode. No account was created.",
      );
    }

    const email = "anithafrancis104@gmail.com";

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      throw new Error(
        "An account with this email already exists. No changes were made.",
      );
    }

    const name = await rl.question("Enter your admin name: ");
    const password = await rl.question(
      "Create a strong password (minimum 12 characters): ",
    );
    const confirmPassword = await rl.question("Confirm your password: ");

    if (!name.trim()) {
      throw new Error("Name cannot be empty.");
    }

    if (password.length < 12) {
      throw new Error("Password must contain at least 12 characters.");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
      name: name.trim(),
      email,
      password: hashedPassword,
      role: "superadmin",
    });

    console.log("\nSuperadmin account created successfully!");
    console.log("Email:", email);
    console.log("Role: superadmin");
  } catch (error) {
    console.error("\nAccount creation failed:", error.message);
    process.exitCode = 1;
  } finally {
    rl.close();
    await mongoose.disconnect().catch(() => {});
  }
}

createSuperAdmin();
