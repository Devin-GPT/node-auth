import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';

// types/index.ts
export type NextFunction = () => void;
export type HttpRequest = http.IncomingMessage;
export type HttpResponse = http.ServerResponse;

// types/userRouter.ts
export type RequestHandler = (
  req: IncomingMessage,
  res: ServerResponse,
) => void;

// types/userRouteHandler.ts
export interface UserRequestBody {
  username: string;
  email: string;
  password: string;
}
