const mysql = require("mysql");

//配置链接 mysql
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "my_db_02",
});

module.exports = db;
