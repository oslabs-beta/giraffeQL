const mongoose =  require('../mongoose.js');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  oAuthId: {
    type: "String"
  },
  username: {
    type: "String"
  },
  displayName: {
    type: "String"
  },
  profileUrl: {
    type: "String"
  },
  photos: [{
    value: {
      type: "String"
    }
  }],
  folders: [{
    name: "String",
  }]
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);