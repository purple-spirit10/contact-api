import mongoose from "mongoose";

export async function connectDB(uri) {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(uri, { autoIndex: true });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB runtime error:", err);
  });
}
