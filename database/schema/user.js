const mogoose = require('mongoose');

const UserSchema = new mogoose.Schema({
  userId: int,
  provider: String,
  username: String,
  displayName: String,
});

module.exports = mogoose.model('user', UserSchema, 'users');
