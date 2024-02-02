const express = require("express");
const { create, router: jsonRouter, defaults } = require("json-server");

const app = express();
const jsonServer = create();
const serverRouter = jsonServer.router("db.json");

// Enable CORS by adding the appropriate headers
const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const jsonServerMiddleware = (req, res, next) => {
  jsonRouter(req, res, next);
};

// Use the CORS middleware for all routes
app.use(allowCors(jsonServerMiddleware));

// Start the Express server on port 5000
const PORT_EXPRESS = 5000;
app.listen(PORT_EXPRESS, () => {
  console.log(`Express server is running on port ${PORT_EXPRESS}`);
});

// Use the default JSON Server middleware
jsonServer.use(defaults());
// Use the JSON Server router for all routes
jsonServer.use(jsonRouter);

// Start the JSON Server on port 3000
const PORT_JSON_SERVER = 3000;
jsonServer.listen(PORT_JSON_SERVER, () => {
  console.log(`JSON Server is running on port ${PORT_JSON_SERVER}`);
});
