const createError = require("http-errors");
const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/files/:path', function (req, res) {
//     let filePath = req.params.path;

//     res.setHeader('Content-Type', 'text/html');

//     res.charset = "utf-8";

//     res.render(path.join(__dirname, filePath, ".txt"));
// });

app.use("/", indexRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, () => {
    console.log(`Example app listening on port 3000`);
});

module.exports = app;
