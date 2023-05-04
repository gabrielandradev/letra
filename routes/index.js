const express = require("express");
const router = express.Router();
const db = require("../models/book");

router.get("/", function (req, res, next) {
  db.allDocs({ include_docs: true, descending: true }, function (err, doc) {
    res.render("index", { books: doc.rows });
  });
});

router.get('/:id', function (req, res) {
  db.get(req.params.id).then(function (doc) {
    res.render("book", { book: doc });
  }).catch(function (err) {
    console.log(err);
  });
});

router.post("/search", (req, res) => {
  const query = req.body.q;

  db.search({
    query: query,
    fields: ['title', 'author'],
    include_docs: true
  }).then(function (result) {
    res.render("search-result", { results: result.rows, query: query });
  }).catch(function (err) {
    if (err)
      throw err;
  });
});

module.exports = router;