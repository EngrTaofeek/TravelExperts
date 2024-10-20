const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./backend/routes/index.js");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "frontend")));
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});