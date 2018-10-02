/**
 * Created by kishe56@gmail.com on 2018. 7. 10.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
  roomName: { type: String, required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  waitingUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', RoomSchema);
//# sourceMappingURL=Room.js.map