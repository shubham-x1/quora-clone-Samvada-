const express = require("express");
const router = express.Router();

const qrouter = require("./quest");
const ansrouter = require("./ans");
const historyrouter = require("./history");

router.get("/", (req, res) => {
  res.send("Api for Quora clone");
});

router.use("/quest", qrouter);
router.use("/ans", ansrouter);
router.use("/history", historyrouter);

module.exports = router;