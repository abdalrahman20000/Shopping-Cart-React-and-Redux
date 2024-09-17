const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Shopping-Cart",
    password: "admin1234",
    port: 5432,
});

pool.connect();

// pool.query("select * from users",(req,res) => {console.log(res.rows)});

// pool.end();

module.exports = pool;