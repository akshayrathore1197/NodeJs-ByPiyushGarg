const express = require("express");
const { connectMongoDB } = require("./connection");

const { logReqRes } = require("./middlewares");

const userRouter = require("./routes/user");

const app = express();
const PORT = 3000;

// Connection
connectMongoDB("mongodb://127.0.0.1:27017/myApp-1").then(() =>
  console.log("MongoDb Connected")
);


// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server Started At ${PORT}`));
