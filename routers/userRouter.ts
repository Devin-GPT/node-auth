import http, { IncomingMessage, ServerResponse } from 'http';

const PORT = 3330;

interface RouteHandler {
    (req: IncomingMessage, res: ServerResponse): void;
}

interface Routes {
    [key: string]: {
        [method: string]: RouteHandler;
    };
}

const routes: Routes = {
    '/q': {
        'POST': async (req: IncomingMessage, res: ServerResponse) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // Convert binary chunks to string
            });
            req.on('end', () => {
                try {
                    const jsonData = JSON.parse(body); // Parse the JSON body
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Data received successfully', data: jsonData }));
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Invalid JSON', error: error.message }));
                }
            });
        },
        'GET': async (req: IncomingMessage, res: ServerResponse) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hello World!');
        }
    },
    // Add more routes as needed
};

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const routeHandler = routes[req.url]?.[req.method ?? 'GET'];
    if (routeHandler) {
        routeHandler(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route or method not supported' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

