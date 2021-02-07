const { plural, singular } = require('pluralize');
const { 
  convertDataType, 
  capitalizeFirstLetter, 
  findJoinTables,
  mapJoinConnections,
  sortTables
} = require('./helpers.js');

const exampleData = require('../exampledata.json');

//turn table database into GraphQL format schema
function tableToType(table, joinConnections) {
    let upperCaseL = capitalizeFirstLetter(table.name);
    let type = `type ${singular(upperCaseL)} { \n`;

    table.columns.forEach((col) => {
      type += ' ' + mapColumn(col) + '\n';
    })

    if (table.connections.length) {
      table.connections.forEach((conn) => {
        type += ' ' + mapConnection(conn.destinationTable) + '\n';
      })
    }

    if (joinConnections) {
      joinConnections.forEach((jc) => {
        type += ` ${mapConnection(jc)}\n`;
      })
    }

    type += '}'
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
  let allTypes = `TypeDefs = \` \n`;
  const [baseTables, joinTables] = sortTables(tables);
  const joinTables = findJoinTables(tables);
  const tablesToType = tables.filter((table) => {
    return !Object.keys(joinTables).includes(table.name)
  });
  const allJoinConnections = mapJoinConnections(joinTables);
  tablesToType.forEach((table) => {
    allTypes += tableToType(table, allJoinConnections[table.name]) + '\n\n';
  });
  return allTypes + `\``;
}

module.exports = generateAllTypes;