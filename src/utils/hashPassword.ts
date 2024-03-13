import bcrypt from 'bcrypt';

// Defines the number of rounds to use for hashing with bcrypt.
// Higher values increase security but also the time required for hashing.
const saltRounds = 10;

// Type definition for the function that creates a hashed password.
// It accepts one argument, the plain text password, and returns the hashed password as a string.
// In case of failure, it should ideally throw an error or handle it accordingly.
type CreatePasswordHashFunction = (password: string) => string;

/**
 * Synchronously hashes a plain text password using bcrypt.
 *
 * @param password The plain text password to hash.
 * @returns The hashed password as a string.
 * @throws {Error} Throws an error if hashing fails.
 */
export const createPasswordHash: CreatePasswordHashFunction = (password) => {
  try {
    // Hash the password using bcrypt's synchronous method with predefined salt rounds.
    return bcrypt.hashSync(password, saltRounds);
  } catch (error) {
    // Log the error for debugging purposes.
    console.error('Error hashing password:', error);

    // Re-throw the error to be handled by the caller or to fail loudly, preventing silent failures.
    throw new Error('Failed to hash password');
  }
};
