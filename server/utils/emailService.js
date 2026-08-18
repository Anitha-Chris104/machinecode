import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (email, resetUrl) => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true,
    auth: {
      user: "resend",
      pass: apiKey,
    },
  });

  await transporter.sendMail({
    from: "MachineCode Admin <onboarding@resend.dev>",
    to: email,
    subject: "MachineCode Admin Password Reset",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>MachineCode Admin Password Reset</h2>

        <p>You requested to reset your admin password.</p>

        <p>Click the button below to create a new password:</p>

        <p>
          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background: #852e47;
              color: white;
              text-decoration: none;
              border-radius: 6px;
            "
          >
            Reset Password
          </a>
        </p>

        <p>This link will expire shortly.</p>

        <p>
          If you did not request this password reset,
          you can safely ignore this email.
        </p>

        <p>— MachineCode Team</p>
      </div>
    `,
  });
};
