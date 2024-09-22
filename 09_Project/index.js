const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 3000;

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
app.get("/users", (req, res) => {
  const html = `
      <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join()}
      </ul>
      `;
  return res.send(html);
});

app.get("/api/users", (req, res) => {
  // console.log(req.myName);
  console.log(req.headers);
  res.setHeader("X-MyName","Akshay Rathore")
  
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).send("User not found");
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  if(!body || !body.first_name || !body.gender || !body.email){
    return res.status(400).json({error: "Invalid request body"})
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`Server Started At ${PORT}`));
