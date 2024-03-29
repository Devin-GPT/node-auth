import jwt from 'jsonwebtoken';
import { IncomingMessage, ServerResponse } from 'http';
import { NextFunction } from '../types';

/**
 * Defines a middleware function type for consistency and future middleware implementations.
 */
type MiddlewareFunction = (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction,
) => void;

interface JWTREQ extends IncomingMessage {
  user: unknown;
}
/**
 * Authentication middleware placeholder for future JWT implementation.
 * Logs access and proceeds to the next middleware or route handler.
 *
 * @param req The HTTP request object, representing the incoming request.
 * @param res The HTTP response object, used to send back the desired HTTP response.
 * @param next A callback function to continue to the next middleware in the stack.
 */
export const authMiddleware: MiddlewareFunction = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Unauthorized: No token provided' }));
    return;
  }
  const JWT_SECRET = process.env.JWT_SECRET || '';

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Unauthorized: Invalid token' }));
      return;
    }

    // Attach the decoded user data to the request for further use
    (req as JWTREQ).user = decoded;
    next();
  });
};
