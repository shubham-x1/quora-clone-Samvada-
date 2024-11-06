const express = require("express");
const cors = require("cors");
const path = require("path");
const server = express();
const bodyParser = require("body-parser");
const port = 3001;
const db = require("./database");
const router = require("./routes");

db.connect();


server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Headers", "*");
  next();
});
server.use(cors());
server.use("/api",router);

server.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
server.use(express.static(path.join(__dirname, "/../frontend/build")));

server.get("*", (req, res) => {
  try {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  } catch (e) {
    res.send("Oops! unexpected error");
  }
});


server.listen(port, () => {
  console.log(`server running at ${port}`);
});