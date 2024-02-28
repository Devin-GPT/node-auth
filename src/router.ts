// router.ts
import { IncomingMessage, ServerResponse } from 'http';
import { userRouteHandler } from './handlers/userRouteHandler';
import { authMiddleware } from './middleware/authMiddleware';

/**
 * Simple router to direct requests to the appropriate handler.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 */
export function router(req: IncomingMessage, res: ServerResponse): void {
    // Normalize the request URL by removing query string
    const urlPath = req.url?.split('?')[0] ?? '';

    if (urlPath.startsWith('/users')) {
        console.log('Routing to /users');
        // Use the auth middleware before proceeding to the user handler
        authMiddleware(req, res, () => userRouteHandler(req, res));
    } else {
        // Provide a default response for unmatched routes
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}

