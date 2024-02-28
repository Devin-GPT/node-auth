import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database using Mongoose.
 * Utilizes environment variables for configuration to enhance security and flexibility.
 * Exits the process with failure if unable to connect, ensuring the application does not start in an unstable state.
 */
export const connectDB: () => Promise<void> = async () => {
  const mongoURI: string =
    process.env.MONGO_URI || 'mongodb://mongodb:27017/node-auth';

  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err: unknown) {
    // Assuming err is of type Error for better type safety
    const error = err as Error;
    console.log('MongoDB NOT Connected...');
    console.error(error.message);
    process.exit(1);
  }
};
