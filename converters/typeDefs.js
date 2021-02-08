const { plural, singular } = require('pluralize');
const { 
  convertDataType, 
  capitalizeFirstLetter,
  sortTables,
  joinConnections
} = require('./helpers.js');

//turn table database into GraphQL format schema
function tableToType(table, joinConnections) {
    let upperCaseL = capitalizeFirstLetter(table.name);
    let type = `  type ${singular(upperCaseL)} { \n`;

    table.columns.forEach((col) => {
      type += `   ${mapColumn(col)}\n`;
    })

    table.connections.forEach((conn) => {
      type += `   ${mapConnection(conn.destinationTable)}\n`;
    })

    if (joinConnections) {
      joinConnections.forEach((jc) => {
        type += `   ${mapConnection(jc)}\n`;
      })
    }

    type += ' }'
    return type;
}

//turn a single column object into a line in the GraphQL object definition
function mapColumn(column) {
  let str = `${column.name}: ${convertDataType(column.dataType)}`;
  if (column.required) str += '!';
  return str;
}

// turns a referenced tables into a line in the GraphQL object definition
function mapConnection(connection) {
  const connectedObj = capitalizeFirstLetter(singular(connection));
  return `${connection}: [${connectedObj}]`;
}

// highest level function that takes a list of tables and their connections
// returns the graphQL TypeDefs 
function generateAllTypes(tables) {
  //Forming GraphQL database
  let allTypes = 'const typeDefs = `\n';
  //Forming GraphQL Query
  let tableQuery = `type Query {\n`;
  const [baseTables, joinTables] = sortTables(tables);
  const allJoinConnections = joinConnections(joinTables);
  baseTables.forEach((table) => {
    allTypes += tableToType(table, allJoinConnections[table.name]) + '\n\n';
    tableQuery += `  ${mapConnection(table.name)}\n`;
  });
  return allTypes + '\n\n' + tableQuery + '}' + '`';
}

/*
  type Query {
    people: [Person]
    films: [Film]
    species: [Species]
    planets: [Planet]
  }
  */


module.exports = generateAllTypes;