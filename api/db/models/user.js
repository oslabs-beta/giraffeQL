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
  }]
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);