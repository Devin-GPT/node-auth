import * as http from 'http';
import { connectDB } from './data/database';
import { router } from './routers/userRouter';

// Use a function to safely parse environment variables
function getPort(defaultPort: number): number {
  const port = process.env.PORT;
  return port !== undefined ? parseInt(port, 10) : defaultPort;
}

const PORT: number = getPort(3330);

// Define types for Request and Response to improve readability and type safety
type HttpRequest = http.IncomingMessage;
type HttpResponse = http.ServerResponse;

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
        router(req, res);
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
