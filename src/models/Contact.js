import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name is too long"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
      unique: true,
      // simple permissive phone pattern; adjust as needed
      match: [/^[0-9+\-() ]{7,20}$/, "Invalid phone format"]
    },
    company: { type: String, trim: true, maxlength: 120 },
    notes: { type: String, trim: true, maxlength: 1000 }
  },
  { timestamps: true }
);

contactSchema.index({ email: 1 }, { unique: true });
contactSchema.index({ phone: 1 }, { unique: true });
contactSchema.index({ name: "text", email: "text", phone: "text", company: "text" });

export const Contact = mongoose.model("Contact", contactSchema);
