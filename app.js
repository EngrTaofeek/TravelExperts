const express = require("express");
const cors = require("cors");
const path = require("path");
const packageRoutes = require('./backend/routes/packageRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "frontend/public")));

// Routes
app.use('/api/packages', packageRoutes);

app.get("/", (req, res) => {
  res.render("Hello world");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});