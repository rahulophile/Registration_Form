const mysql = require("mysql2");

const express = require("express");
const app = express();

const path = require("path");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const connection = mysql.createConnection({
    host: process.env.DB_HOST,        
    user: process.env.DB_USER,        
    password: process.env.DB_PASS,    
    database: process.env.DB_NAME,
});

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/terms", (req, res) => {
    res.render("terms.ejs");
});

// add data in mysql database
app.post("/", (req, res) => {
    const { name, registration, email, mobile, branch, batch, motivation } = req.body;
    const q = "INSERT INTO student (name, reg_no, email, mob_no, branch, batch, feedback) values (?, ?, ?, ?, ?, ?, ?)";
    let values = [name, registration, email, mobile, branch, batch, motivation];
    connection.query(q, values, (err, result) => {
        if (err) {
            let errorMessage = err.sqlMessage;
            return res.render("home.ejs", { errorMessage });
        }
        res.redirect("/terms");
    });
});


app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});