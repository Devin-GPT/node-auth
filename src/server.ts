// server.ts
import * as http from 'http';
import { connectDB } from "./data/database";
import { router } from './router';
const PORT: number = parseInt(process.env.PORT || '3330', 10);

async function startServer(): Promise<void> {
    try {
        await connectDB();
        console.log('Database connection successful');
        
        http.createServer(router).listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Server startup error:', error);
        process.exit(1);
    }
}

startServer().catch(console.error);
