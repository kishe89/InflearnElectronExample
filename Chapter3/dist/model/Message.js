/**
 * Created by kishe56@gmail.com on 2018. 7. 10.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  message: { type: String, required: true },
  receiver: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  noSee: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  CreatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
//# sourceMappingURL=Message.js.map