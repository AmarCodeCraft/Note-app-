const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const cookieParser = require("cookie-parser");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(cookieParser());

app.get("/", (req, res) => {
  fs.readdir(`./files`, (error, files)=>{
    res.render("index", {files: files});
  })
});

app.post("/create", (req, res) => {
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (error)=>{
    res.redirect("/")
  })
});

app.get("/file/:fileName", (req, res)=>{
    fs.readFile(`./files/${req.params.fileName}`, "utf-8", (error, filedata)=>{
       res.render("show", {fileName: req.params.fileName, filedata})
    })
})

app.listen(port, () => {
  console.log("Server is runing on", port);
});
