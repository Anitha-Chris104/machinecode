import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import Admin from "../models/Admin.js";
import { sendPasswordResetEmail } from "../utils/emailService.js";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find admin
    const normalizedEmail = email.trim().toLowerCase();
    const admin = await Admin.findOne({ email: normalizedEmail });
    console.log("Admin login diagnostic:", {
      adminFound: Boolean(admin),
      passwordHashPresent: Boolean(admin?.password),
      passwordHashLooksBcrypt: /^\$2[aby]\$\d{2}\$/.test(admin?.password || ""),
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Check password

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    console.log("Admin password diagnostic:", {
      adminFound: true,
      passwordHashLooksBcrypt: /^\$2[aby]\$\d{2}\$/.test(admin.password || ""),
      passwordMatches: isPasswordCorrect,
    });

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Always return the same message.
    // This prevents exposing whether an admin email exists.
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const admin = await Admin.findOne({
      email: normalizedEmail,
    });

    // Don't reveal whether the email exists.
    if (!admin) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      });
    }

    // Generate a secure random token.
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store only the hash in MongoDB.
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Token expires in 15 minutes.
    const resetExpires = new Date(Date.now() + 15 * 60 * 1000);

    admin.resetPasswordToken = hashedToken;
    admin.resetPasswordExpires = resetExpires;

    await admin.save();

    const frontendUrl = process.env.CLIENT_URL || "http://localhost:5173";

    const resetUrl = `${frontendUrl}/admin/reset-password/${resetToken}`;

    await sendPasswordResetEmail(admin.email, resetUrl);

    return res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to process password reset request.",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Validate input
    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and password are required.",
      });
    }

    // Basic password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    // Hash the token received from the reset URL
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find admin with matching token that hasn't expired
    const admin = await Admin.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: {
        $gt: new Date(),
      },
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Reset link is invalid or has expired.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    admin.password = hashedPassword;

    // Remove reset token so it cannot be reused
    admin.resetPasswordToken = null;
    admin.resetPasswordExpires = null;

    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful. You can now log in.",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password.",
    });
  }
};

export const updateSuperAdminProfile = async (req, res) => {
  try {
    const { name, email, currentPassword } = req.body;

    if (!name?.trim() || !email?.trim() || !currentPassword) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and current password are required.",
      });
    }

    const admin = await Admin.findById(req.admin._id);

    if (!admin || admin.role !== "superadmin") {
      return res.status(403).json({
        success: false,
        message: "Superadmin permission required.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      admin.password,
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingAdmin = await Admin.findOne({
      email: normalizedEmail,
      _id: { $ne: admin._id },
    });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "That email is already in use.",
      });
    }

    admin.name = name.trim();
    admin.email = normalizedEmail;

    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Superadmin profile updated successfully.",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Update superadmin profile error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to update profile.",
    });
  }
};

export const changeSuperAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current and new passwords are required.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters.",
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "Choose a different password.",
      });
    }

    const admin = await Admin.findById(req.admin._id);

    if (!admin || admin.role !== "superadmin") {
      return res.status(403).json({
        success: false,
        message: "Superadmin permission required.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      admin.password,
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    admin.password = await bcrypt.hash(newPassword, 12);
    admin.resetPasswordToken = null;
    admin.resetPasswordExpires = null;

    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully. Please sign in again.",
    });
  } catch (error) {
    console.error("Change superadmin password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to change password.",
    });
  }
};
