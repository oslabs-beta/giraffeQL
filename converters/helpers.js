//All helper function for converters
module.exports = {
  convertDataType: (sqlDataType) => {
    switch (sqlDataType) {
    case 'character varying':
      return 'String';
    case 'integer':
      return 'Int';
    case 'bigint':
      return 'Int';
    case 'date':
      return 'Int';
    default:
      return 'Unknown';
    }
  },

  capitalizeFirstLetter: (string) => {
    return string[0].toUpperCase() + string.slice(1);
  },

  // function to identify which tables are join tables 
  // assumes that a join table will be made up entirely of connections 
    // aside from the primary key of the table
  findJoinTables: (tables) => {
    return tables.reduce((joinTables, table) => {
      if (table.columns.length - table.connections.length <= 1) {
        joinTables[table.name] = table.connections.map((conn) => {
          return conn.destinationTable;
        })
      }
      return joinTables;
    }, {})
  },

  sortTables: (tables) => {
    const baseTables = [];
    const joinTables = [];
    tables.forEach((table) => {
      if (table.columns.length - tables.connections.length <= 1) {
        joinTables.push(table);
      } else {
        baseTables.push(table);
      }
    })
    return [baseTables, joinTables];
  }

  mapJoinConnections: (joinTables) => {
    return Object.keys(joinTables).reduce((connections, currTable) => {
      joinTables[currTable].forEach((ele, idx) => {
        if (!connections[ele]) connections[ele] = [];
        const connectedTables = joinTables[currTable].slice()
        connectedTables.splice(idx,1);
        connections[ele].push(...connectedTables);
      })
      return connections;
    }, {})
  }

}