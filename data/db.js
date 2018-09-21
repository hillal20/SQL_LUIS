const config = require("../knexfile.js");
const knex = require("knex");
module.exports = knex(config.development); // = db in server

////// from knex website

// let knex = require("knex")({
//   client: "sqlite3",
//   connection: {
//     filename: "./mydb.sqlite"
//   }
// });

///// from knexfile.js

// module.exports = {
//   development: {
//     client: "sqlite3",
//     connection: {
//       filename: "data/cs9.sqlite3"
//     },
//     useNullAsDefault: true
//   },
