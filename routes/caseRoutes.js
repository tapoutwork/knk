const express = require("express");
const router = express.Router();

const {
  createCase, getAllCases, getCaseById } = require("../controllers/caseController");

router.post("/cases", createCase);
router.get("/cases", getAllCases);
router.get("/cases/:id", getCaseById);

router.get("/test", (req, res) => {
  res.send("Route working");
});

module.exports = router;