import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, "Name Required!"] },
  email: { type: String, required: [true, "Email Required!"] },
  phone: { type: String, required: [true, "Phone Required!"] },
  aboutMe: { type: String, required: [true, "About Me Section Is Required!"] },
  password: { type: String, required: [true, "Password Required!"], minLength: [8, "Password Must Contain At Least 8 Characters!"], select: false },
  avatar: { public_id: { type: String, required: true }, url: { type: String, required: true } },
  resume: { public_id: { type: String, required: true }, url: { type: String, required: true } },
  portfolioURL: { type: String, required: [true, "Portfolio URL Required!"] },
  githubURL: String,
  instagramURL: String,
  twitterURL: String,
  linkedInURL: String,
  facebookURL: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Pre-save hook (async without next)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Generate Reset Password Token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min

  return resetToken;
};

export const User = mongoose.model("User", userSchema);
