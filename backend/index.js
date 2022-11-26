import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpasswordhere",
  database: "test",
});

app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.json("Hello from the mysql DB!");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to Backend!");
});
