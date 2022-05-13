const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 8080;

app.use((req, res, next) => {
  req.on("data", (data) => {
    req.body = JSON.parse(`${data}`);
    next();
  });
});

process.on("uncaughtException", (error) => {
  console.error(error);
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
