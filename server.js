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
server.use(defaults());
server.options("/*", cors(corsOptions)); // Handle OPTIONS requests explicitly
server.use(router);

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Listen to port
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

// Export the Server API
export default server;
