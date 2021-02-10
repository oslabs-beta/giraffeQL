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
      type += `    ${mapColumn(col)}\n`;
    })

    table.connections.forEach((conn) => {
      type += `    ${mapConnection(conn.destinationTable)}\n`;
    })

    if (joinConnections) {
      joinConnections.forEach((jc) => {
        type += `    ${mapConnection(jc)}\n`;
      })
    }

    type += '  }'
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

/* createPerson(
      gender: String,
      species_id: Int,
      homeworld_id: Int,
      height: Int,
      mass: String,
      hair_color: String,
      skin_color: String,
      eye_color: String,
      name: String!,
      birth_year: String,
    ): Person!

    updatePerson(
      gender: String,
      species_id: Int,
      homeworld_id: Int,
      height: Int,
      _id: Int!,
      mass: String,
      hair_color: String,
      skin_color: String,
      eye_color: String,
      name: String!,
      birth_year: String,
    ): Person!

    deletePerson(_id: ID!): Person!
    */

function createObjMutations(table) {
  const objectName = capitalizeFirstLetter(singular(table.name));
  let create = `    create${objectName}(\n`;
  let update = `    update${objectName}(\n`;
  let deleteMutation = `    delete${objectName}(`;
  const close = `): ${objectName}!`
  table.columns.forEach((col) => {
    if (col.primaryKey) {
      update += `      ${mapColumn(col)}\n`;
      deleteMutation += `${col.name}: ID!`;
    } else {
      create += `      ${mapColumn(col)}\n`;
      update += `      ${mapColumn(col)}\n`;
    }
  })
  return `${create}    ` + close + '\n\n' + `${update}    ` + close + '\n\n' + deleteMutation + close; // +'\n';
}

// highest level function that takes a list of tables and their connections
// returns the graphQL TypeDefs 
function generateAllTypes(tables) {
  console.log(tables);
  //Forming GraphQL database
  let allTypes = 'const typeDefs = `\n';
  //Forming GraphQL Query
  let tableQuery = `  type Query {\n`;
  //Forming type mutation
  let typeMutation = `  type Mutation {\n`;
  let mutationResolvers = `  Mutation: {\n`;
  const [baseTables, joinTables] = sortTables(tables);
  const allJoinConnections = joinConnections(joinTables);
  let resolvers = 'const resolvers = {\n';
  let objectResolvers = '';
  baseTables.forEach((table) => {
    allTypes += `${tableToType(table, allJoinConnections[table.name])}\n\n`;
    tableQuery += `    ${mapConnection(table.name)}\n`;
    typeMutation += `${createObjMutations(table)}\n`;
    resolvers += `  ${generateResolverFunc(table.name)}\n`;
    mutationResolvers += `${generateMutationResolvers(table.name)}\n`;
    // objectResolvers += generateObjectResolver();
    objectResolvers += `${generateObjectResolver(table, allJoinConnections[table.name])}\n`;
  });
  resolvers += objectResolvers + mutationResolvers + '  }\n' + '}';
  const exportText = `module.exports = {\n  typeDefs,\n  resolvers\n}`;
  return allTypes + '\n' + tableQuery + '  }\n\n' + typeMutation + '  }\n' + '}`\n\n' + resolvers + '\n\n' + exportText;
}

/*
  type Query {
    people: [Person]
    films: [Film]
    species: [Species]
    planets: [Planet]
  }
  */

function generateMutationResolvers(tableName) {
  const mutations = ['create', 'update', 'delete'];
  let mutationResolvers = '';
  const objName = capitalizeFirstLetter(singular(tableName));
  mutations.forEach((mutation) => {
    const funcName = `    ${mutation}${objName}`;
    mutationResolvers += generateResolverFunc(funcName) + '\n';
  })
  return mutationResolvers;
}

function generateResolverFunc(table) {
  return (
    `${table}: (parent, args, context, info) => {
      try {
        // fill in with your db query
      } catch (err) {
        throw new Error(err);
      }
    },`
  )
}

function generateObjectResolver(table, joinConnections) {
  const object = capitalizeFirstLetter(singular(table.name));
  let objResolver = ` ${object}: {\n`;
  table.connections.forEach((conn) => {
    objResolver += `  ${generateResolverFunc(conn.destinationTable)}\n`
  })
  if (joinConnections) {
    joinConnections.forEach((jc) => {
      objResolver += `  ${generateResolverFunc(jc)}\n`;
    })
  }
  return objResolver + '  },\n';
}
module.exports = generateAllTypes;