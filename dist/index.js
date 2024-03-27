"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const database_1 = require("./data/database");
const userRouter_1 = require("./routers/userRouter");
// Use a function to safely parse environment variables
function getPort() {
    return process.env.NODE_ENV === 'debug' ? 9229 : 3330;
}
const PORT = getPort();
/**
 * Initializes the HTTP server and connects to the database.
 */
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.connectDB)();
            console.log('Database connection successful');
            // Create and start the HTTP server
            http
                .createServer((req, res) => {
                console.log(`Received request: ${req.method} ${req.url}`);
                (0, userRouter_1.router)(req, res);
            })
                .listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
        }
        catch (error) {
            console.error('Server startup error:', error);
            process.exit(1);
        }
    });
}
startServer().catch(console.error);
