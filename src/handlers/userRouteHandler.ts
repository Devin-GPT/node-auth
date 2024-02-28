// handlers/userRouteHandler.ts
import { IncomingMessage, ServerResponse } from 'http';

/**
 * Handles user-related routes.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 */
export function userRouteHandler(req: IncomingMessage, res: ServerResponse): void {
    if (req.method === 'GET') {
        // Respond to GET requests on the user route
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User endpoint reached' }));
    } else if (req.method === 'POST') {
        // Collect and echo the request body for POST requests
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string and accumulate
        });
        req.on('end', () => {
            try {
                // Attempt to parse the accumulated string as JSON
                const parsedBody = JSON.parse(body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                // Echo back the received JSON body
                res.end(JSON.stringify({ receivedBody: parsedBody }));
            } catch (error) {
                // Handle JSON parsing errors
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON in request body' }));
            }
        });
    }
}