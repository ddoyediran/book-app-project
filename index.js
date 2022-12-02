const express = require("express");
require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();

const coursesRouter = require("./routes/coursesRouter.js");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(coursesRouter);

// app.get("/", (req, res) => {
//   res.send("Welcome!");
//   return;
// });

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
