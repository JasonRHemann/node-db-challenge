const express = require("express");
const projectRouter = require("./projects/project-router");
const server = express();

server.use(express.json());
server.use("/api", projectRouter);
server.get("/", (req, res) => {
  res.status(200).json({ message: "API working" });
});

module.exports = server;
