//All helper function for converters
module.exports = {
  convertDataType: (sqlDataType) => {
    switch (sqlDataType) {
      case "character varying":
        return "String";
      case "integer":
        return "Int";
      case "bigint":
        return "Float";
      case "date":
        return "Int";
      default:
        return "Unknown";
    }
  },

  capitalizeFirstLetter: (string) => {
    return string[0].toUpperCase() + string.slice(1);
  },

  // sorts tables into two categories: base tables and join tables
  // join tables are defined as those which are made up of foreign keys (except for the primary key)
  sortTables: (tables) => {
    const baseTables = [];
    const joinTables = [];
    tables.forEach((table) => {
      if (table.columns.length - table.connections.length <= 1) {
        joinTables.push(table);
      } else {
        baseTables.push(table);
      }
    });
    return [baseTables, joinTables];
  },

  // takes an array of join tables and determines the connections between base tables
  joinConnections: (joinTables) => {
    const tableRels = {};
    joinTables.forEach((joinTable) => {
      joinTable.connections.forEach((conn, idx, arr) => {
        const connectedTable = conn.destinationTable;
        if (!tableRels[connectedTable]) tableRels[connectedTable] = [];
        const otherTables = arr.slice();
        otherTables.splice(idx, 1);
        tableRels[connectedTable].push(
          ...otherTables.map((table) => table.destinationTable)
        );
      });
    });
    return tableRels;
  },
  
};

