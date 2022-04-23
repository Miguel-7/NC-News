const {
  fetchTopics,
  fetchArticleById,
  updateArticleById,
} = require("../models/models.js");

exports.getTopics = (req, res) => {
  fetchTopics().then(topics => res.status(200).send({ topics }));
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
