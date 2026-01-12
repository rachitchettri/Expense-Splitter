import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true, // for OTP and notifications
    },

    password: {
      type: String,
      required: true,
    },

    // OTP for password recovery
    otp: {
      type: Number,
    },

    otpExpires: {
      type: Date,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// 🔒 Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔑 Match password
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
