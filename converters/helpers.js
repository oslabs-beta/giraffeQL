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
  }

}