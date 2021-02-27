const { connectToDB, asyncQuery } = require('../../../controller/controller.js');
const { dbDataQuery } = require('../../../storage/query.js');

module.exports = {
  scrapeDB: async (req, res, next) => {
    // connect to db and verify connections
    const pool = await connectToDB(req.body.URI);
    if (pool instanceof Error) return next(dbData);
    // query for db data and check for errors
    const dbData = await asyncQuery(pool, dbDataQuery);
    if (dbData instanceof Error) return next(dbData);
    // convert [null] connections arrays to []
    const tables = dbData.rows.map(obj => {
      if (obj.connections[0] === null) obj.connections = [];
      return obj;
    });
    // return data
    res.status(200).json({ tables: tables });
  }
}