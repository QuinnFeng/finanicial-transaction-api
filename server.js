import express from "express";
import { create, router, as, _router, defaults, rewriter } from "json-server";
import cors from "cors";

const expressApp = express();
const jsonServer = create();
const jsonRouter = _router("db.json");

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

// Express App
expressApp.get("/", (req, res) => {
  res.send("Welcome to NodeJS + Express + JSON Server! 🎈");
});

expressApp.listen(5000, () => {
  console.log("Express server is running on port 5000");
});

// JSON Server
jsonServer.use(cors(corsOptions));
jsonServer.use(defaults());
jsonServer.options("/*", cors(corsOptions)); // Handle OPTIONS requests explicitly
jsonServer.use(jsonRouter);

jsonServer.listen(3000, () => {
  console.log("JSON Server is running on port 3000");
});
