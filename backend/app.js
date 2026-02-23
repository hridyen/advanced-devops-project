const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "backend",
    timestamp: new Date()
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Backend API working via Nginx reverse proxy" });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend running on port ${port}`);
});