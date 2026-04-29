require("dotenv").config();
const express = require("express");
const cors = require("cors");
const caseRoutes = require("./routes/caseRoutes");

const connectDB = require("./config/db");

const app = express();

/* Connect Database */
connectDB();

/* Middlewares */
app.use(cors());
app.use(express.json());

app.use("/api/v1", caseRoutes);


/* Test Route */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* Start Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});