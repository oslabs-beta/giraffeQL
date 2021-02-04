// Store all SQL syntax
module.exports = {
  dbDataQuery: `SELECT a.name,
      a.columns,
      json_agg(CASE 
          WHEN tc.constraint_name IS NULL then NULL 
          else 
          json_build_object(
        'originKey', kcu.column_name,
        'destinationTable', ccu.table_name,
        'destinationKey', ccu.column_name
      ) end) as connections
  FROM (
    SELECT tbs.table_name as name,
        jsonb_agg(json_build_object(
          'name', col.column_name,
          'dataType', col.data_type,
          'required', CASE col.is_nullable WHEN 'YES' THEN false ELSE true END
        )) as columns
      FROM information_schema.tables tbs 
      JOIN information_schema.columns col 
      ON tbs.table_name = col.table_name 
      WHERE tbs.table_schema = 'public'
        AND table_type = 'BASE TABLE'
      GROUP BY tbs.table_name
  ) a 
  LEFT JOIN information_schema.table_constraints tc 
    ON a.name = tc.table_name
    AND tc.constraint_type = 'FOREIGN KEY'
  LEFT JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
  LEFT JOIN information_schema.constraint_column_usage ccu 
    ON tc.constraint_name = ccu.constraint_name
  GROUP BY a.name, a.columns;`
};