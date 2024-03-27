import * as http from 'http';
import { connectDB } from './data/database';
import userRouter from './routers/userRouter';
import { HttpRequest, HttpResponse } from './types';

// Use a function to safely parse environment variables
function getPort(): number {
  return process.env.NODE_ENV === 'debug' ? 9229 : 3330;
}

const PORT: number = getPort();

/**
 * Initializes the HTTP server and connects to the database.
 */
async function startServer(): Promise<void> {
  try {
    await connectDB();
    console.log('Database connection successful');

    // Create and start the HTTP server
    http
      .createServer((req: HttpRequest, res: HttpResponse) => {
        console.log(`Received request: ${req.method} ${req.url}`);
        userRouter(req, res);
      })
      .listen(PORT, () =>
        console.log(`Server running at http://localhost:${PORT}`),
      );
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
}

startServer().catch(console.error);
