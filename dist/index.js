"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import http = require('http');
const http = require("http");
const PORT = process.env.PORT || 3330;
http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello World!');
    res.end();
}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
