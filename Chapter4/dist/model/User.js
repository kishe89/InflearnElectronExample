/**
 * Created by kishe56@gmail.com on 2018. 7. 10.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: { type: String, required: true },
  password: { type: String, required: true },
  token: String,
  agoToken: String,
  socketId: String,
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  friendReceiveRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
  inviteRooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
//# sourceMappingURL=User.js.map