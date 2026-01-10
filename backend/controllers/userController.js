import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js"
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary"
import { generateToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar and Resume are Required!", 400))
  }
  const { avatar, resume } = req.files;


  const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    { folder: "AVATARS" }
  );
  if (!cloudinaryResponseForAvatar) {
    return next(new ErrorHandler("Avatar upload failed", 500));
  }


  const cloudinaryResponseForResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    { folder: "MY_RESUME" }
  );
  if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
    console.log("cloudinary error:", cloudinaryResponseForResume.error || "unknown Cloudinary errror");

  }

  const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    facebookURL,
    linkedInURL,
  } = req.body;

  const user = await User.create({
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    facebookURL,
    linkedInURL,
    avatar: {
      public_id: cloudinaryResponseForAvatar.public_id,
      url: cloudinaryResponseForAvatar.secure_url
    },
    resume: {
      public_id: cloudinaryResponseForResume.public_id,
      url: cloudinaryResponseForResume.secure_url,
    },
  })

  generateToken(user, "user Registered", 201, res);

});

export const login = catchAsyncErrors(async (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("invalid email or password!", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("invalid email or password!", 400));
  }

  generateToken(user, "Logged in successfully", 200, res);

})

export const logout = catchAsyncErrors(async (req, res, next) => {
  res.status(200).cookie("token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
    samesite: "None"
  }).json({
    success: true,
    message: "User logout successfully"
  })
})

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  })
})

 export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    aboutMe: req.body.aboutMe,
    githubURL: req.body.githubURL,
    instagramURL: req.body.instagramURL,
    portfolioURL: req.body.portfolioURL,
    facebookURL: req.body.facebookURL,
    twitterURL: req.body.twitterURL,
    linkedInURL: req.body.linkedInURL,
  };

  const user = await User.findById(req.user.id);

  /* ===================== AVATAR ===================== */
  if (req.files?.avatar) {
    // delete old avatar ONLY if it exists
    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    const uploadedAvatar = await cloudinary.uploader.upload(
      req.files.avatar.tempFilePath,
      { folder: "AVATARS" }
    );

    newUserData.avatar = {
      public_id: uploadedAvatar.public_id,
      url: uploadedAvatar.secure_url,
    };
  }

  /* ===================== RESUME ===================== */
  if (req.files?.resume) {
    if (user.resume?.public_id) {
      await cloudinary.uploader.destroy(user.resume.public_id);
    }

    const uploadedResume = await cloudinary.uploader.upload(
      req.files.resume.tempFilePath,
      { folder: "MY_RESUME" }
    );

    newUserData.resume = {
      public_id: uploadedResume.public_id,
      url: uploadedResume.secure_url,
    };
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    newUserData,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Profile Updated!",
    user: updatedUser,
  });
});


export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("please Fill all the feilds", 400));
  }
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatch = await user.comparePassword(currentPassword);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("incorrect password", 400));
  }

  if (newPassword !== confirmNewPassword) {
    return next(new ErrorHandler(" newPassword and confirmNewPassword do not matched", 400));
  }
  user.password = newPassword;

  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Password updated successfully"
  })
})

export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
  const id = "6951052dc34568f8f78aa902";

  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user
  })
})

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${process.env.DASHBOARD_URI}/password/reset/${resetToken}`;

    const message = `Hello ${user.fullName},

You requested a password reset. Click the link below to reset your password:

${resetPasswordUrl}

If you did not request this, please ignore this email.
`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Personal Portfolio Dashboard Password Recovery",
        message,
      });

      return res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });

    } catch (emailError) {
      console.log("Email sending error:", emailError);

      // rollback token
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        message: "Failed to send reset password email. Please try again.",
      });
    }

  } catch (error) {
    console.log("Server error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};


export const resetPassword = catchAsyncErrors(async (req, res, next) => {

  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired.",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password & Confirm Password do not match"));
  }
  user.password = await req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });

  generateToken(user, "Reset Password Successfully!", 200, res);
})