const express = require("express");
const router = express.Router();
const validateCase = require("../middlewares/validateCase");

const {
  createCase, getAllCases, getCaseById, updateCase, deleteCase, updateCaseStatus } = require("../controllers/caseController");

  // CRUD routes
router.post("/cases", validateCase, createCase);
router.get("/cases", getAllCases);
router.get("/cases/:id", getCaseById);
router.put("/cases/:id", validateCase, updateCase);
router.delete("/cases/:id", deleteCase);
router.patch("/cases/:id/status", updateCaseStatus);

// Test route
router.get("/test", (req, res) => {
  res.send("Route working");
});

module.exports = router;