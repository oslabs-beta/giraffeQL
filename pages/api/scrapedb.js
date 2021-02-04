const { dbDataQuery } = require('../../storage/query.js');
const { connectToDB, asyncQuery, errorHandler } = require('../../controller/controller.js');

// POST request turn re-orangized database back to frontend
export default async (req, res) => {
    if (req.method === 'POST') {
        // connect to db and verify connections
        const pool = await connectToDB(req.body.URI);
        if (pool instanceof Error) return errorHandler(res, pool);
        // query for db data and check for errors
        const dbData = await asyncQuery(pool, dbDataQuery);
        if (dbData instanceof Error) return errorHandler(res, dbData);
        // convert [null] connections arrays to []
        const tables = dbData.rows.map(obj => {
            if (obj.connections[0] === null) obj.connections = [];
            return obj;
        });
        // return data
        res.status(200).json({ tables: tables });
    } else {
        res.status(400).json(`${req.method} is not handled!`);
    }
}