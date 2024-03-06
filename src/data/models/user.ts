import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface to define the User model properties.
 * Extends Document from mongoose to include built-in properties like _id.
 */
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  registered?: Date; // Optional since it has a default value
}

// Define the schema for a user
const userSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // Removed unique: true for password since typically, passwords are hashed and
    // uniqueness isn't enforced at the database level for password fields.
  },
  registered: {
    type: Date,
    default: Date.now,
  },
});

// Create a model for the user schema and explicitly declare the IUser interface for type checking
const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
