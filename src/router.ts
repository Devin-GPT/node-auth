import { IncomingMessage, ServerResponse } from 'http';
import { userRouteHandler } from './handlers/userRouteHandler';
import { authMiddleware } from './middleware/authMiddleware';

// Define custom types for readability and future flexibility
type RequestHandler = (req: IncomingMessage, res: ServerResponse) => void;

/**
 * Directs requests to the appropriate handler based on the request URL.
 * Utilizes middleware where applicable before proceeding to the specific route handler.
 * 
 * @param req The HTTP request object.
 * @param res The HTTP response object.
 */
export const router: RequestHandler = (req, res) => {
    // Ensure URL is defined before proceeding with routing logic
    if (!req.url) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request: URL is undefined');
        return;
    }

    // Normalize the request URL by removing the query string
    const urlPath = req.url.split('?')[0];

    // Route handling logic
    switch (true) {
        case urlPath.startsWith('/users'):
            console.log('Routing to /users');
            authMiddleware(req, res, () => userRouteHandler(req, res));
            break;
        default:
            // Default response for unmatched routes
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            break;
    }
};
