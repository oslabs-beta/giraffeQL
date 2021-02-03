const { tableQuery, connectionQuery } = require('../../storage/query.js');
const { connectToDB, asyncQuery, errorHandler } = require('../../controller/controller.js');

// POST request turn re-orangized database back to frontend
export default async (req, res) => {
    if (req.method === 'POST') {
        const pool = connectToDB(req.body.URI);
        const tables = await asyncQuery(pool, tableQuery);
        if (tables instanceof Error) return errorHandler(tables);
        const connections = await asyncQuery(pool, connectionQuery);
        if (connections instanceof Error) return errorHandler(connections);
        res.status(200).json({
                        tables: tables.rows,
                        connections: connections.rows,
                    });
    } else {
        res.status(400).json(`${req.method} is not handle!`);
    }
  }