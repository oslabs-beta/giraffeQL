const User = require('../models/user');

module.exports = {
  findOrCreate: async (oAuthData) => {
    try {
      const user = await User.findOne({ oAuthId: oAuthData.id });
      if (!user) {
        const newUser = new User({oAuthId: oAuthData.id, oAuthData: oAuthData});
        await newUser.save();
        return newUser;
      }
      return user;
    } catch (e) {
      return Error('User not found');
    }
  },
  findById: async (id) => {
    return User.findOne({ oAuthId: id });
  }
};