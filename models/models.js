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
