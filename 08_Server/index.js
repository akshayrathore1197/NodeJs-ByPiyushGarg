const express = require("express");

function myHandler(req, res) {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.method} ${req.url}New Request\n`;
  const myUrl = url.parse(req.url, true);

  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        if (req.url === "GET") res.end("HomePage");

        break;
      case "/about":
        const username = myUrl.query.myname;
        res.end(`hi, ${username}`);
        break;
      case "/search":
        const search = myUrl.query.search;
        res.end(`searching for ${search}`);
        break;
      case "/signup":
        if (req.method === "GET") res.end("This is signup form");
        else if (req.method === "POST") {
          res.end("Success");
        }

      default:
        res.end("404 Not Found");
    }
  });
}

const app = express();

app.get("/", (req, res) => {
  return res.send(`Hello From Home Page`);
});

app.get("/about", (req, res) => {
  return res.send(`Hello ${req.query.name}`);
});

app.listen(7000, () => console.log(" Server Started !! "));
