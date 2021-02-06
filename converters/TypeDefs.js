const { plural, singular } = require('pluralize');
const { convertDataType, capitalizeFirstLetter } = require('./helpers.js');

const exampleData = require('../exampledata.json');

//turn table database into GraphQL format schema
function tableToType(table) {
    let upperCaseL = capitalizeFirstLetter(table.name);
    let type = `type ${singular(upperCaseL)} { \n`;

    table.columns.forEach((col) => {
      type += ' ' + mapColumn(col) + '\n';
    })
    type += '}'
    return type;
}

//turn a single column object into a line in the GraphQL object type
function mapColumn(column) {
  let str = `${column.name}: ${convertDataType(column.dataType)}`;
  if (column.required) str += '!';
  return str;
}

function generateAllTypes(tables) {
  let allTypes = ``;
  tables.forEach((table) => {
    allTypes += tableToType(table) + '\n\n';
  });
  return allTypes;
}

module.exports = generateAllTypes;