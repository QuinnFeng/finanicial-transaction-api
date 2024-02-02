// JSON Server module
import { create, router as _router, defaults, rewriter } from "json-server";
import cors from "cors";

const server = create();
const router = _router("db.json");

const corsOptions = {
  origin: ["http://localhost:5173", "https://banking-react-indol.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Origin",
    "X-Requested-With",
    "Accept",
    "x-client-key",
    "x-client-token",
    "x-client-secret",
    "Authorization",
  ],
  credentials: true,
};

// Middleware setup
server.use(cors(corsOptions));
server.use(defaults()); // Make sure to use defaults() after cors() to include default JSON Server middlewares

// Custom route rewriter
server.use(
  rewriter({
    "/*": "/$1",
  })
);

// Router
server.use(router);

// Listen to port
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

// Export the Server API
export default server;
