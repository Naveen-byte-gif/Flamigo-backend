const express = require("express");
const connectDB = require("./db");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("MongoDB is connected!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
