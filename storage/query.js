// Store all SQL syntax
module.exports = {
    tableQuery: `SELECT tbs.table_name as name,
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
    GROUP BY tbs.table_name;`,

  connectionQuery: `SELECT tbs.table_name as origin,
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
      AND tbs.table_type = 'BASE TABLE';`
};