const db = require("../db/connection.js");

exports.fetchTopics = () => {
  return db.query("SELECT * FROM  topics;").then(result => result.rows);
};

exports.fetchArticleById = articleId => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [articleId])
    .then(({ rows }) => {
      const article = rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `No article found for Article ID: ${articleId}`,
        });
      }
      return article;
    });
};

exports.updateArticleById = (articleId, incVotes) => {
  if (!incVotes)
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Missing 'inc_votes' property",
    });

  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
      [incVotes, articleId]
    )
    .then(({ rows }) => {
      const article = rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `No article found for Article ID: ${articleId}`,
        });
      }
      return article;
    });
};

exports.fetchUsers = () => {
  return db.query("SELECT username FROM users").then(({ rows }) => rows);
};
