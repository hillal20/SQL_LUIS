const express = require("express");
const server = express();
const db = require("./data/db.js");

server.use(express.json());
const port = process.env.PORT || 4000;

server.get("/", (req, res) => {
  res.send("==> up and running ");
});

server.get("/zoos", (req, res) => {
  // db("zoos")

  db.select("*")
    .from("zoos")
    .where("id", "in", [5, 6, 7])
    .orWhere("id", "in", [9])
    .whereNotIn("id", [9, 10])
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

server.put("/zoos/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db.select("*")
    .from("zoos")
    .where("id", "=", id) // or .where({ id: id })
    .update(changes)
    .then(count => {
      db.select("*")
        .from("zoos")
        .where("id", "=", id)
        .then(updated => {
          res.status(200).json(updated);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/zoos/:id", (req, res) => {
  const { id } = req.params;

  db.select("*")
    .from("zoos")
    .where("id", "=", id) // or .where(id, '=', id)
    .del()
    .then(count => {
      // count === number of records deleted
      res.status(200).json({ msg: `record with id '${id}' deleted` });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/boos", (req, res) => {
  db.schema.createTable("bills", table => {
    table.increments();
    table.string("name");
    table.timestamps();
  });
  //db.schema.renameTable("users", "old_users");
  //db.schema.dropTable("users");

  db.select("*")
    .from("bills")
    // .where("id", "in", [5, 6, 7])
    // .orWhere("id", "in", [9])
    // .whereNotIn("id", [9, 10])
    .then(zoos => {
      res.status(200).json({ msg: zoos });
    })
    .catch(err => {
      res.status(500).json({ msg: err });
    });
});

server.post("/boos", (req, res) => {
  const bills = req.body;

  db.insert(bills)
    .into("bills")
    .then(ids => {
      console.log("ids===>", ids);
      const id = ids[0];
      res.status(201).json({ ...bills, id });
    })
    .catch(err => {
      res.status(500).json({ msg: err });
    });
});

server.listen(port, () => {
  console.log(`=== server is running on port ${port} ===`);
});
