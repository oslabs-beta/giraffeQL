const { Pool } = require('pg');

module.exports = {
  connectToDB: async (URI) => {
    return new Promise((resolve) => {
      const pool = new Pool({ connectionString: URI });
      // test if db connection works
      pool.query("SELECT 1", (err, data) => {
        if (err) return resolve(new Error(err));
        return resolve(pool);
      }); 
    });
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
    res.status(400).json('Error in middleware function- check server logs for more information');
  }
}