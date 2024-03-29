import jwt from 'jsonwebtoken';
import { IncomingMessage, ServerResponse } from 'http';
import { createUser } from '../services/userService'; // Update this path accordingly
import { createPasswordHash } from '../utils/hashPassword';
import { UserRequestBody } from '../types';

/**
 * Parses the request body to JSON.
 * @param req The HTTP request object.
 * @returns A promise that resolves with the parsed JSON body.
 */
function parseRequestBody(req: IncomingMessage): Promise<UserRequestBody> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('Invalid JSON in request body'));
      }
    });
  });
}

/**
 * Responds to GET requests on the user route.
 * @param res The HTTP response object.
 */
function handleGetRequest(res: ServerResponse): void {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'User endpoint reached' }));
}

// Other imports and functions remain the same...

/**
 * Handles POST requests by creating a new user with the provided request body.
 * @param req The HTTP request object.
 * @param res The HTTP response object.
 */
async function handlePostRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const JWT_SECRET = process.env.JWT_SECRET || '';
  try {
    const requestBody = await parseRequestBody(req);
    requestBody.password = createPasswordHash(requestBody.password);
    const createdUser = await createUser(requestBody);
    const token = jwt.sign({ username: createdUser.username }, JWT_SECRET, {
      expiresIn: '1h',
    });
    // Consider what information you want to return. Avoid sending sensitive data like passwords.

    // Inside handlePostRequest function

    const { password, ...userWithoutPassword } = createdUser.toObject();
    const hashPassword = password;
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ user: { userWithoutPassword, hashPassword, token } }),
    );
  } catch (error) {
    // Depending on the error type, you might want to return different status codes
    // For example, a 400 Bad Request for validation errors, or a 500 Internal Server Error for others
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: (error as Error).message }));
  }
}

/**
 * Routes the request based on the method to the appropriate handler.
 * @param req The HTTP request object.
 * @param res The HTTP response object.
 */
export function userRouteHandler(
  req: IncomingMessage,
  res: ServerResponse,
): void {
  switch (req.method) {
    case 'GET':
      handleGetRequest(res);
      break;
    case 'POST':
      handlePostRequest(req, res).catch((error) => {
        console.error('Error handling POST request:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      });
      break;
    default:
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      break;
  }
}
