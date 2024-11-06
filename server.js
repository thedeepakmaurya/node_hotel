const express = require("express");
const app = express();
const db = require("./db");
const PORT = process.env.PORT || 3000;
require("dotenv").config();
const passport = require("./auth");

// Middleware function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);
app.use(express.json());
app.use(passport.initialize());
3;
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
  res.send("Welcome to hotel database!");
});

//Import routes
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

//use the router
app.use("/person",  personRoutes);
app.use("/menu", localAuthMiddleware, menuItemRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
