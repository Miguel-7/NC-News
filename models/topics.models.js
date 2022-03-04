const db = require("../db/connection.js");

const fetchTopics = () => {
  return db.query("SELECT * FROM  topics;").then(result => result.rows);
};

module.exports = fetchTopics;
