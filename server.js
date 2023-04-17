const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
require("dotenv").config();

// express app
const app = express();

// connect to MongoDb
const dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI)
  .then((res) => {
    console.log("connected to db");
    // listen for requests
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs"); // default is views
// app.set("views", "myviews");

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // middleware for accepting form data
app.use(morgan("dev")); // for logging in console colorful status codes

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  //   res.send("<p>About page</p>");
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
