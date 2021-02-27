const User = require('../models/user');

module.exports = {
  findOrCreate: async (oAuthData) => {
    try {
      const user = await User.findOne({ oAuthId: oAuthData.id });
      if (!user) {
        const newUser = new User({
          oAuthId: oAuthData.id, 
          username: oAuthData.username,
          displayName: oAuthData.displayName || '',
          profileUrl: oAuthData.profileUrl,
          photos: oAuthData.photos
        });
        await newUser.save();
        return newUser;
      }
      return user;
    } catch (e) {
      return Error('User not found');
    }
  },
  findById: async (id) => {
    return await User.findOne({ oAuthId: id });
  },
  updateUser: (req, res, next) => {
    try{
      const { oAuthId, displayName, email } = req.body;
      User.findOneAndUpdate(
        {oAuthId},
        {displayName, email},
        {
          new: true,
          upsert: true
        })
        .then((data) => {
          res.locals.user = data;
          return next();
        })
    } catch(err) {
      return next(err);
    }
  },
  deleteUser: (req, res, next) => {
    User.findOneAndDelete({ oAuthId: req.user.id })
      .then((data) => {
        if (!data) res.status(203).send('no user found')
        return next();
      })
      .catch((err) => next(err))
  },
  createFolder: (req, res, next) => {
    try{
      const { oAuthId, folder } = req.body;
      User.findOneAndUpdate(
        {oAuthId},
        {"$push": { folders: folder }},
        {
          new: true,
          upsert: true
        })
        .then((data) => {
          res.locals.folders = data.folders;
          return next();
        })
    } catch(err) {
      return next(err);
    }
  },
  deleteFolder: (req, res, next) => {
    try{
      const { oAuthId, folder } = req.body;
      User.findOneAndUpdate(
        {oAuthId},
        {"$pull": { folders: folder }},
        {
          new: true,
          upsert: true
        })
        .then((data) => {
          res.locals.folders = data.folders;
          return next();
        })
    } catch(err) {
      return next(err);
    }
  }
};