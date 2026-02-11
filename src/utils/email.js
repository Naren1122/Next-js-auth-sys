import nodemailer from "nodemailer";

// Function to send verification email
export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${userId}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@yourapp.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `
        <h1>${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}</h1>
        <p>Thank you for signing up! Please verify your email address by clicking the link below:</p>
        <a href="${verifyUrl}">Verify Email</a>
        <p>If you did not create an account, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

// Function to send verification email
export const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@yourapp.com",
      to: email,
      subject: "Verify Your Email",
      html: `
        <h1>Verify Your Email</h1>
        <p>Thank you for signing up! Please verify your email address by clicking the link below:</p>
        <a href="${verifyUrl}">Verify Email</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not create an account, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

// Function to send password reset email
export const sendPasswordResetEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-reset-token?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@yourapp.com",
      to: email,
      subject: "Reset Your Password",
      html: `
        <h1>Password Reset Request</h1>
        <p>You recently requested to reset your password for your account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};
