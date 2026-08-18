import dotenv from "dotenv";

dotenv.config({
  path: "./server/.env",
});

const { sendPasswordResetEmail } = await import("./utils/emailService.js");

const testEmail = async () => {
  try {
    await sendPasswordResetEmail(
      "anithafrancis104@gmail.com",
      "https://example.com/test-reset",
    );

    console.log("Test email sent successfully!");
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

testEmail();
