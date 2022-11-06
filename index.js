const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());

const { connection } = require("./Config/config");

const userRoute = require("./routes/user.route");

const noteRoute = require("./routes/notes.route");

const Authentication = require("./Middlewares/Authentication");

app.get("/", (req, res) => {
  res.send("Welcome Home");
});

app.use("/user", userRoute);
app.use("/notes", Authentication, noteRoute);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (err) {
    //console.log(err)
    console.log("Connection Error");
  }
  console.log("Server listening on PORT 8080");
});
