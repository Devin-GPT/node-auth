// userService.ts
import UserModel from '../data/models/user'; // Update this path accordingly

/**
 * Creates a new user in the database.
 * @param userData The user data to create a new user.
 * @returns The created user document.
 */
export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const newUser = new UserModel(userData);
  return await newUser.save();
};
