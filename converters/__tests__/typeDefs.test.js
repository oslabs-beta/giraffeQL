const {tableToType, mapColumn, mapConnection} = require('../typeDefs')

describe("mapColumn function",()=>{
    const testColumn = {
        name: 'films',
        dataType: 'character varying',
        required: true
    }
    it('turn a single column object into a line in the GraphQL object definition',()=>{
        expect(mapColumn(testColumn)).toBe(`films: String!`)
    })
})