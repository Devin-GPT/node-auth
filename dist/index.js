const http = require('http');
const PORT = process.env.PORT || 3330;



http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/') {
        // Set the status code and content type for JSON response
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        // Send a JSON response
        res.end(JSON.stringify({ message: 'Hello World' }));
    } 
    else {
        // Handle any other URLs or methods
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
}).listen(PORT, () => {
    console.log(`Serverr running at http://localhost:${PORT}`);
});
