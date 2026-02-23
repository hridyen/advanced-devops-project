const express = require("express");

const { Client } = require("pg");

const mysql = require("mysql2");


const app = express();
const port = 5000;


console.log("Backend service starting...");

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

client.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("DB connection error:", err));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "backend", version: "v1" });

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

});
