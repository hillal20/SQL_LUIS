const express = require("express");
const server = express();
const db = require("./data/db.js");

server.use(express.json());
const port = process.env.PORT || 4000;

server.get("/", (req, res) => {
  res.send("==> up and running ");
});

server.get("/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ msg: err });
    });
});

server.post("/zoos", (req, res) => {
  const zoos = req.body;

  db.insert(zoos)
    .into("zoos")
    .then(ids => {
      console.log("ids===>", ids);
      const id = ids[0];
      res.status(201).json({ ...zoos, id });
    })
    .catch(err => {
      res.status(500).json({ msg: err });
    });
});

server.listen(port, () => {
  console.log(`=== server is running on port ${port} ===`);
});
