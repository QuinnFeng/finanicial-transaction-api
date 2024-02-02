// JSON Server module
import { create, router as _router, defaults, rewriter } from "json-server";
import cors from "cors";
const server = create();
const router = _router("db.json");

const corsOptions = {
  origin: ["http://localhost:5173", "https://banking-react-indol.vercel.app/"], // use your actual domain name (or localhost), using * is not recommended
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

// Make sure to use the default middleware
const middlewares = defaults();

// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // Replace '*' with your actual origin
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

server.use(middlewares);
// Add this before server.use(router)
server.use(cors(corsOptions));
server.use(
  // Add custom route here if needed
  rewriter({
    "/*": "/$1",
  })
);
server.use(router);
// Listen to port
server.listen(3000, () => {
  console.log("JSON Server is running");
});

// Export the Server API
export default server;
