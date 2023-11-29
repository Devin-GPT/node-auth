// import http = require('http');
import * as http from 'http';

const PORT = process.env.PORT || 3330;

http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello World');
    res.end();

}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})