const PouchDB = require("pouchdb");
const db = new PouchDB("db");

PouchDB.plugin(require('pouchdb-quick-search'));

module.exports = db;