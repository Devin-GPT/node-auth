import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

// Function takes in password, encrypts with bcrypt and then creates JSON webtoken and returns the webtoken
/**
 */
type CreateJSONWebTokenFunction = (
  password: string,
  username: string,
) => Promise<string>;

/**
 * @param password To do write description.
 * @param username To do write description.
 */
export const createJSONWebTokenFunction: CreateJSONWebTokenFunction = async (
  password,
  username,
) => {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create token payload
    const payload = {
      username,
      password: hashedPassword,
    };

    // Create and return the JWT
    return jwt.sign(payload, jwtSecret, { expiresIn: '1h' }); // Token expires in 1 hour
  } catch (error) {
    console.error('Error in createJSONWebTokenFunction:', error);
    throw new Error('Error creating JWT');
    // console.log(password, username);
  }
};
