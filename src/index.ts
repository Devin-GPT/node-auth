import * as http from 'http';
import {connectDB} from "./data/database";
import { router } from './router';
const PORT: number = parseInt(process.env.PORT || '3330', 10);


/**
 * Initializes the HTTP server and connects to the database.
 */
async function server(): Promise<void> {
    try {
        // Ensure the database is connected before starting the server
        await connectDB();
        console.log('Database connection successful');
        
        // Create the HTTP server
        http.createServer((req, res) => {
            console.log(`Received request: ${req.method} ${req.url}`);
            // Delegate request handling to the router
            router(req, res);
        }).listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        // Log and exit on startup errors (e.g., database connection issues)
        console.error('Server startup error:', error);
        process.exit(1);
    }
}

server().catch(console.error);
