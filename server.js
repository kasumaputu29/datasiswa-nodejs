const express = require("express");
const mysql = require("mysql");
const BodyParser = require("body-parser");

const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
  // createConnection/connect to database
  host: "localhost",
  database: "db-nodejstest",
  user: "root",
  password: "",
});

db.connect(function (err, success) {
  // jika error dan jika success
  if (err) {
    // jika error
    console.error("Failed to connect");
  } else if (success) {
    // jika success
    console.log("Connected to database");

    app.get("/", (req, res) => {
      const sql = "SELECT * FROM user";
      db.query(sql, (err, result) => {
        const user = JSON.parse(JSON.stringify(result));
        // console.log("Database: ", user);
        res.render("index", { users: user, title: "DATA SISWA | DB-NODEJSTEST" });
      });
      // res.send(result) // send hello world to localhost:8000
    });

    app.post("/mengirim", (req, res) => {
      // Insert data ke dalam database
      const SqlInsert = `INSERT INTO user (nama, kelas, absen) VALUES ('${req.body.nama}', '${req.body.kelas}', '${req.body.absen}')`;
      db.query(SqlInsert, (err, result) => {
        if (err) {
          console.error("Insert data Error");
        }
        res.redirect("/");
      });
    });
  }
});

app.listen(8000, () => console.log("Server listening on")); // listen on port 8000
