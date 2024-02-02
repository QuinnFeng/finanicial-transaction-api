// JSON Server module
import { create, router as _router, defaults, rewriter } from "json-server";
import cors from "cors";
const server = create();
const router = _router("db.json");

// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

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
server.use(cors());
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
