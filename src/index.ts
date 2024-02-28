import * as http from 'http';
import connectDB from "./data/database";
import User from './data/user'; // Assuming `User` is the correct model class

const PORT = process.env.PORT || 3330;

async function server() {
    await connectDB(); // Correctly await the connection

    // Example user creation for demonstration; consider moving to an appropriate route
    try {
        const newUser = new User({ username: "devin", email: "kyle@mail.net", password: "password" });
        await newUser.save();
        console.log('New user created');
    } catch (error) {
        console.error('Error creating user:', error);
    }

    http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
        // Basic request handling example
        if (req.url === '/' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hello World!');
        }
    }).listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

server().catch(console.error);