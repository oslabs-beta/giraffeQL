const { Pool } = require("pg");

const tableQuery = `SELECT tbs.table_name as name,
	json_agg(json_build_object(
		'name', col.column_name,
		'dataType', col.data_type,
		'required', CASE col.is_nullable WHEN 'YES' THEN false ELSE true END
	)) as columns
FROM information_schema.tables tbs 
JOIN information_schema.columns col 
	ON tbs.table_name = col.table_name 
WHERE tbs.table_schema = 'public'
    AND table_type = 'BASE TABLE'
GROUP BY tbs.table_name;`

const connectionQuery = `SELECT tbs.table_name as origin,
	kcu.column_name as originKey,
	ccu.table_name as destination,
	ccu.column_name as destinationKey
FROM information_schema.tables tbs
JOIN information_schema.table_constraints tc 
	ON tbs.table_name = tc.table_name
	AND tc.constraint_type = 'FOREIGN KEY'
JOIN information_schema.key_column_usage kcu 
	ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu 
	ON tc.constraint_name = ccu.constraint_name
WHERE tbs.table_schema = 'public'
	AND tbs.table_type = 'BASE TABLE';`;

export default (req, res) => {
    if(req.method === 'POST'){
        const URI = req.body.URI;
        const pool = new Pool({ connectionString: URI });
        const query = (text, params, callback) => {
            console.log('executed query', text);
            return pool.query(text, params, callback);
        }
        query(tableQuery, (err, data) => {
            if (err) res.status(400).send(`Error in post request middleware ${err}`)
            else {
                const tables = data.rows;
                query(connectionQuery, (err, data) => {
                    if (err) res.status(400).send(`Error in post request middleware ${err}`)
                    else {
                        const connections = data.rows;
                        res.status(200).json({ 
                            tables: tables,
                            connections: connections
                        });
                    }
                })
            }
        })
        console.log("POST request is working!!!");
        
    }else{
        res.status(400).json(`${req.method} is not handle!`)
    }
  }

  /*
  tables, columns and data types
  SELECT tbs.table_name,
	col.column_name,
	col.data_type,
	col.is_nullable
FROM information_schema.tables tbs 
JOIN information_schema.columns col 
	ON tbs.table_name = col.table_name 
WHERE tbs.table_schema = 'public'
    AND table_type = 'BASE TABLE';
    
    tables and constraints
    SELECT tbs.table_name,
	tc.constraint_name,
	kcu.column_name,
	ccu.table_name as reference_table,
	ccu.column_name as referenced_column
FROM information_schema.tables tbs
JOIN information_schema.table_constraints tc 
	ON tbs.table_name = tc.table_name
	AND tc.constraint_type = 'FOREIGN KEY'
JOIN information_schema.key_column_usage kcu 
	ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu 
	ON tc.constraint_name = ccu.constraint_name
WHERE tbs.table_schema = 'public'
	AND tbs.table_type = 'BASE TABLE';
  
  */