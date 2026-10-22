import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (email, resetUrl) => {
  const gmailUser = process.env.SMTP_USER;
  const appPassword = process.env.SMTP_APP_PASSWORD;

  if (!gmailUser || !appPassword) {
    throw new Error("SMTP_USER or SMTP_APP_PASSWORD is missing");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: appPassword,
    },
  });

  const info = await transporter.sendMail({
    from: `MachineCode Admin <${gmailUser}>`,
    to: email,
    subject: "MachineCode Admin Password Reset",
    text: `You requested a password reset for MachineCode Admin.

Open this link to reset your password:
${resetUrl}

This link expires in 15 minutes. If you did not request this, ignore this email.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>MachineCode Admin Password Reset</h2>
        <p>You requested to reset your admin password.</p>
        <p>
          <a href="${resetUrl}"
             style="display:inline-block;padding:12px 20px;background:#852e47;color:white;text-decoration:none;border-radius:6px;">
            Reset Password
          </a>
        </p>
        <p>This link expires in 15 minutes.</p>
        <p>If you did not request this, you can ignore this email.</p>
        <p>— MachineCode Team</p>
      </div>
    `,
  });

  console.log("Password reset email accepted by Gmail:", {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
  });
};
