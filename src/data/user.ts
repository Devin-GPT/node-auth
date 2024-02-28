import mongoose from "mongoose";

// Define the schema for a user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  registered: {
    type: Date,
    default: Date.now
  }
});

// Create a model for the user schema
export default mongoose.model('users', userSchema);