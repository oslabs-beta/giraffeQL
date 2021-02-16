const mongoose =  require('../mongoose.js');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  oAuthId: { type: Number, required: true },
  oAuthData: { type: Object, required: true}
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);