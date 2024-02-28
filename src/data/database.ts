import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://mongodb:27017/node-auth', {
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log('MongoDB NOT Connected...');
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};