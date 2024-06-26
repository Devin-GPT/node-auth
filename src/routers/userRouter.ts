import { userRouteHandler } from '../handlers/userRouteHandler';
import { authMiddleware } from '../middleware/authMiddleware';
import { RequestHandler } from '../types';

/**
 * Directs requests to the appropriate handler based on the request URL.
 * Utilizes middleware where applicable before proceeding to the specific route handler.
 *
 * @param req The HTTP request object.
 * @param res The HTTP response object.
 */
const router: RequestHandler = (req, res) => {
  // Ensure URL is defined before proceeding with routing logic
  if (!req.url) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request: URL is undefined');
    return;
  }

  // Normalize the request URL by removing the query string
  const urlPath = req.url.split('?')[0];

  // Route handling logic
  if (urlPath.startsWith('/users/register/auth')) {
    console.log('Routing to /users/register/auth');
    authMiddleware(req, res, () => userRouteHandler(req, res));
  } else if (urlPath.startsWith('/users/register')) {
    console.log('Routing to /users/register');
    userRouteHandler(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
};
export default router;
