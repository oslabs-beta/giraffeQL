const { Pool } = require('pg');

module.exports = {
  connectToDB: (URI) => {
    return new Pool({ connectionString: URI });
  },
  asyncQuery: async (pool, query, params) => {
    return new Promise((resolve) => {
      pool.query(query, params, (err, data) => {
        if (err) return resolve(new Error(err));
        else return resolve(data);
      })
    })
  },
  errorHandler: (res, err) => {
    console.log(`Error in middleware function: ${err}`);
    res.status(400).JSON('Error in middleware function- check server logs for more information');
  }
}