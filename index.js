const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const thoughtRoute = require("./routes/thoughts");

const app = express();
const port = 8080;

process.on("uncaughtException", (error) => {
  console.error(error);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/thought", thoughtRoute);

app.get("", (req, res) => {
  res.send("Hello");
});

const db = mongoose.connect(
  `mongodb+srv://Omar:root@cluster0.l4g3c.mongodb.net/Cluster0?retryWrites=true&w=majority`,
  {
    // useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
    // autoIndex: true,
  },
  () => {
    console.log("Connected to DB!");
    // console.log(db);
  }
);

app.listen(port, () => {
  console.log(`Server listening on port: http://localhost:${port}`);
});
