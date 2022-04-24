const {
  fetchTopics,
  fetchArticleById,
  updateArticleById,
  fetchUsers,
} = require("../models/models.js");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then(topics => res.status(200).send({ topics }))
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then(article => res.status(200).send({ article }))
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleById(article_id, inc_votes)
    .then(article => res.status(200).send({ article }))
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then(users => res.status(200).send({ users }))
    .catch(next);
};
