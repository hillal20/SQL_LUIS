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

// server.put("/zoos/:id", (req, res) => {
//   const changes = req.body;
//   const id = req.params.id;
//   console.log("changes ===>", changes);
//   console.log("id ===>", id);
//   db("zoos")
//     .where({ id: id })
//     // .select("name")
//     .update(changes)
//     .then(count => {
//       console.log("count ===>", count); // number of records

//       if (count) {
//         db("zoos")
//           .select("name")
//           .where({ id: id })
//           .then(zoo => {
//             res.status(201).json({ msg: zoo });
//           })
//           .catch(err => {
//             res.status(500).json(err);
//           });
//       } else {
//         res.status(404).json({ msg: "the zoo not found" });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ msg: err });
//     });
// });

server.put("/zoos/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("zoos")
    .where("id", "=", id) // or .where({ id: id })
    .update(changes)
    .then(count => {
      // count === number of records updated
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/zoos/:id", (req, res) => {
  const { id } = req.params;

  db("zoos")
    .where({ id }) // or .where(id, '=', id)
    .del()
    .then(count => {
      // count === number of records deleted
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.listen(port, () => {
  console.log(`=== server is running on port ${port} ===`);
});
