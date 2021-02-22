const {convertDataType, capitalizeFirstLetter, sortTables, joinConnections} = require('../helpers')

describe("convertDataType function",()=>{
    it("return String when taking in character varying as argument",()=>{
        expect(convertDataType('character varying')).toBe('String');
    })

    it("return Int when taking in integer as argument",()=>{
        expect(convertDataType('integer')).toBe('Int');
    })

    it("return Float when taking in bigint as argument",()=>{
        expect(convertDataType('bigint')).toBe('Float');
    })

    it("return Int when taking in date as argument",()=>{
        expect(convertDataType('date')).toBe('Int');
    })

    it("return Boolean when taking in boolean as argument",()=>{
        expect(convertDataType('boolean')).toBe('Boolean');
    })
})

describe("capitalizeFirstLetter function",()=>{
    it("Should Capitalize the first letter of the string",()=>{
        expect(capitalizeFirstLetter('hospital')).toBe('Hospital')
    })
})
