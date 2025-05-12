const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});