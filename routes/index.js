var express = require("express");
const multer = require("multer");
var router = express.Router();
const toSlugCase = require("./utils/parse");
const path = require("path");
const db = require("../models/book");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/files/")
  },
  filename: function (req, file, cb) {
    const name = toSlugCase(req.body.title + " " + req.body.author);
    const ext = ".txt";

    cb(null, name + ext);
  }
});

const upload = multer({ storage: storage });

/* GET home page. */
router.get("/", function (req, res, next) {

  db.allDocs({ include_docs: true, descending: true }, function (err, doc) {
    res.render("index", { books: doc.rows });
  });

});

router.get("/add", function (req, res, next) {
  res.render("add");
});


router.get('/:id', function (req, res) {

  db.get(req.params.id).then(function (doc) {
    res.render("book", { book: doc });
  }).catch(function (err) {
    console.log(err);
  });
});

router.post("/search", (req, res) => {
  let query = req.body.q;

  db.search({
    query: query,
    fields: ['title', 'author'],
    include_docs: true
  }).then(function (result) {
    res.render("search-result", {results: result.rows, query: query});
  }).catch(function (err) {
    if (err)
      throw err;
  });
});

router.post("/add", upload.single("txt-file"), (req, res) => {
  let data = req.body;

  let relative_path = req.file.path;

  relative_path = relative_path.substring(relative_path.indexOf('/') + 1);

  let id = toSlugCase(req.body.title + " " + req.body.author);

  let book = {
    _id: id,
    title: data.title,
    author: data.author,
    publication_date: data.publication_date,
    synopsis: data.synopsis,
    filepath: relative_path
  };

  res.setHeader('Content-Type', 'text/plain');

  res.charset = 'utf-8';

  db.put(book, function callback(err, result) {
    if (!err) {
      console.log('The book was successfully uploaded');
    }
  });

  res.send("Book uploaded succesfully");
});

module.exports = router;