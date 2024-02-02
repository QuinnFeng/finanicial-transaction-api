// JSON Server module
// JSON Server module
import { create, router as _router, defaults, rewriter } from "json-server";
const server = create();
const router = _router("db.json");

// Make sure to use the default middleware
const middlewares = defaults();

// Enable CORS by adding the appropriate headers
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Replace '*' with your actual origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(middlewares);

// Add this before server.use(router)
server.use(router);

// Listen to port
server.listen(3000, () => {
  console.log("JSON Server is running");
});

// Export the Server API
export default server;
