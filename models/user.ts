import { Schema, model, connect } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    registered?: Date; 
  }

  const userSchema = new Schema<IUser>({
    username: { 
        type: String, 
        required: true },
    email: { 
        type: String, 
        required: true },
    password: { 
        type: String, 
        required: true },
    registered: { 
        type: Date, 
        default: Date.now },
    }
  );

  // Create a model from the schema
const UserModel = model<IUser>('User', userSchema);

// Export the model
export default UserModel;