const mongoose = require('../mongoose.js');

const Schema = mongoose.Schema;
const diagramSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  diagramName: {
    type: "String"
  },
  createdAt: {
    type: "Date"
  },
  updatedAt: {
    type: "Date"
  },
  description: {
    type: "String"
  },
  tables: [
    {
      name: "String",
      columns: [{
        name: "String",
        dataType: "String",
        required: "Boolean",
        primaryKey: "Boolean"
      }],
      connections: [{
        originKey: "String",
        destinationTable: "String",
        destinationKey: "String"
      }],
      position: {
        x: "Number",
        y: "Number"
      }
    }
  ],
  favorite: {
    type: "Boolean"
  }
});

module.exports = mongoose.models.Diagram || mongoose.model('Diagram', diagramSchema);