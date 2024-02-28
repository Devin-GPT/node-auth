import { IncomingMessage, ServerResponse } from 'http';
import { createUser } from '../services/userService'; // Update this path accordingly

// Define a type for the request body to enhance type safety and readability
// interface UserRequestBody {
//     // Define properties expected in the request body
// }

/**
 * Parses the request body to JSON.
 * @param req The HTTP request object.
 * @returns A promise that resolves with the parsed JSON body.
 */
function parseRequestBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
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
async function handlePostRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
   
    try {
        const requestBody = await parseRequestBody(req);
        console.log("hero",requestBody)
        const createdUser = await createUser(requestBody);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        // Consider what information you want to return. Avoid sending sensitive data like passwords.
        const { password, ...userWithoutPassword } = createdUser.toObject();
        res.end(JSON.stringify({ user: userWithoutPassword }));
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
export function userRouteHandler(req: IncomingMessage, res: ServerResponse): void {
    switch (req.method) {
        case 'GET':
            handleGetRequest(res);
            break;
        case 'POST':
            handlePostRequest(req, res).catch(error => {
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
