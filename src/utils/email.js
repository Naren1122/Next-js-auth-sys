import nodemailer from "nodemailer";

// Shared styles for a consistent look
const emailStyles = {
  container:
    "font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 12px;",
  header:
    "background-color: #2563eb; padding: 24px; border-radius: 10px 10px 0 0; text-align: center;",
  headerText: "color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;",
  body: "padding: 30px; background-color: #ffffff; border-radius: 0 0 12px 12px;",
  button:
    "display: inline-block; background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0;",
  footer: "text-align: center; margin-top: 20px; color: #777; font-size: 12px;",
};

// Function to send verification email (Combined helper)
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
    const isVerify = emailType === "VERIFY";

    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@yourapp.com",
      to: email,
      subject: isVerify ? "Verify Your Email" : "Reset Your Password",
      html: `
        <div style="${emailStyles.container}">
          <div style="${emailStyles.header}">
            <h1 style="${emailStyles.headerText}">${isVerify ? "Verify Your Email" : "Reset Your Password"}</h1>
          </div>
          <div style="${emailStyles.body}">
            <p>Hello,</p>
            <p>${isVerify ? "Thank you for signing up! Please confirm your email address to get started:" : "We received a request to reset your password. Click the button below to proceed:"}</p>
            <div style="text-align: center;">
              <a href="${verifyUrl}" style="${emailStyles.button}">${isVerify ? "Confirm Email" : "Reset Password"}</a>
            </div>
            <p style="font-size: 14px; color: #666;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="font-size: 12px; word-break: break-all;"><a href="${verifyUrl}">${verifyUrl}</a></p>
          </div>
          <div style="${emailStyles.footer}">
            <p>If you did not request this, please ignore this email.</p>
            <p>&copy; ${new Date().getFullYear()} YourApp. All rights reserved.</p>
          </div>
        </div>
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
        <div style="${emailStyles.container}">
          <div style="${emailStyles.header}">
            <h1 style="${emailStyles.headerText}">Welcome to AuthFlow</h1>
          </div>
          <div style="${emailStyles.body}">
            <p>Thank you for signing up! We're excited to have you on board.</p>
            <p>Please verify your email address to activate your account:</p>
            <div style="text-align: center;">
              <a href="${verifyUrl}" style="${emailStyles.button}">Verify Email Address</a>
            </div>
            <p style="color: #ef4444; font-size: 13px;"><strong>Note:</strong> This link will expire in 1 hour.</p>
          </div>
          <div style="${emailStyles.footer}">
            <p>If you didn't create an account, you can safely ignore this email.</p>
          </div>
        </div>
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
        <div style="${emailStyles.container}">
          <div style="background-color: #1e293b; padding: 24px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="${emailStyles.headerText}">Password Reset</h1>
          </div>
          <div style="${emailStyles.body}">
            <p>You recently requested to reset your password for your account.</p>
            <p>Click the button below to set a new password:</p>
            <div style="text-align: center;">
              <a href="${resetUrl}" style="display: inline-block; background-color: #1e293b; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0;">Reset Password</a>
            </div>
            <p style="color: #ef4444; font-size: 13px;"><strong>Important:</strong> This link is valid for only 1 hour.</p>
          </div>
          <div style="${emailStyles.footer}">
            <p>If you did not request this reset, please ignore this email or contact support if you have concerns.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};
