const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const thoughtRoute = require("./routes/thoughts");

const app = express();
const port = 8080;

process.on("uncaughtException", (error) => {
  console.error(error);
});

app.use("/api/user", userRoute);
app.use("/api/thought", thoughtRoute);

app.use((req, res, next) => {
  req.on("data", (data) => {
    req.body = JSON.parse(`${data}`);
    next();
  });
});

app.get("", (req, res) => {
  res.send("Hello");
});

mongoose.connect(
  `mongodb+srv://Omar:root@cluster0.l4g3c.mongodb.net/socialapp2?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
  },
  () => {
    console.log("Connected to DB!");
  }
);

app.listen(port, () => {
  console.log(`Server listening on port: http://localhost:${port}`);
});
