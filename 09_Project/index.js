const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/myApp-1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // console.log("Hello from middleware 1");
  // req.myName = "Akshay"

  fs.appendFile(
    "log.txt",
    `${Date.now()} : ${req.method} : ${req.path}\n`,
    (err, data) => {
      next();
    }
  );
});

// app.use((req, res, next) => {
//   console.log("Hello from middleware 2", req.myName);
//   next();
// });

// Routes
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
      <ul>
      ${allDbUsers
        .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
        .join()}
      </ul>
      `;
  return res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});

  // res.setHeader("X-MyName", "Akshay Rathore");
  return res.json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async(req, res) => {
   const user = await User.findById(req.params.id)
    if (!user) return res.status(404).send("User not found");
    return res.json(user);
  })
  .patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id,{lastName:"Changed"})
    return res.json({ status: "Success" });
  })
  .delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "Success" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: "success", id: users.length });
  // });

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log("result", result);

  return res.status(201).json({ msg: "success" });
});

app.listen(PORT, () => console.log(`Server Started At ${PORT}`));
