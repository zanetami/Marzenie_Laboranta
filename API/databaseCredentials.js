const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lab',
  password: 'Zxcvbnm1',
  port: 5433,
})

module.exports = {
  pool
}