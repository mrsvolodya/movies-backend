const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("hello word!");
});

app.listen(3000, () => {
  console.log("Hi, APP IS LISTENING!");
});

// const cors = require("cors");
// const jsonServer = require("json-server");
// const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults();

// app.use(cors());
// app.use(middlewares);
// app.use("/movies", router);
// app.listen(10000, () => {
//   console.log("Server is running on http://localhost:10000");
// });
