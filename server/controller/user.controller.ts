import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email";

const EMAIL = "cs.nishantchoudhary@gmail.com";
export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, contact } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let verificationToken = generateVerificationCode();
    if (email === EMAIL) {
      verificationToken = generateVerificationCode();
    } else {
      verificationToken = email.substring(0, 6);
    }
    // console.log("Veirification token", verificationToken);
    user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    generateToken(res, user);

    // Check if email is not "cs.nishantchoudhary@gmail.com" before sending verification email
    if (email === EMAIL) {
      await sendVerificationEmail(email, verificationToken);
    }
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    generateToken(res, user);
    user.lastLogin = new Date();
    await user.save();

    //send user without password
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullname}`,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { verificationCode, email } = req.body;
    // console.log("Verification Code from request:", verificationCode);

    // Retrieve user and log details
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).select("-password");

    if (!user) {
      console.log("User not 3found or token expired.");
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    // Log the retrieved token details for comparison
    // console.log("Stored Verification Token:", user.verificationToken);
    // console.log("Token Expiry Time:", user.verificationTokenExpiresAt);

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    if (email === "cs.nishantchoudhary@gmail.com") {
      try {
        await sendWelcomeEmail(user.email, user.fullname);
        console.log("Welcome email sent to:", email);
      } catch (error) {
        console.error("Error sending welcome email:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to send welcome email. Please try again later.",
        });
      }
    }
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    return res.clearCookie("token").status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenExpireAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpireAt;

    await user.save();

    //send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.FRONTEND_URL}/resetpassword`
    );

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }
    //update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();

    // send success reset email
    await sendResetSuccessEmail(user.email);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const { fullname, email, address, city, country, profilePicture } =
      req.body;
    // upload image on cloudinary
    let cloudResponse: any;
    cloudResponse = await cloudinary.uploader.upload(profilePicture);
    const updatedData = {
      fullname,
      email,
      address,
      city,
      country,
      profilePicture,
    };

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
