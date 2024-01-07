// import http = require('http');
import * as http from 'http';

const PORT = process.env.PORT || 3330;

http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {

    if (req.method === 'POST' && req.url === '/register') {
        let body = '';

        req.on('data', chunk => {
            console.log("chunk", chunk)
            body += chunk.toString(); // Convert Buffer to string
        });

        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body); // Parse the JSON body
                const { username, email, password } = parsedBody;

                // Process the data (e.g., validation, storing in database, etc.)
                console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Registration successful' }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid JSON' }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not FounD' }));
    }
}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})

