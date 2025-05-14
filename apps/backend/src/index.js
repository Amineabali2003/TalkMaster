const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const scheduleRoutes = require("./routes/schedule");
const talkRoutes = require("./routes/talk");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/talks", talkRoutes);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});