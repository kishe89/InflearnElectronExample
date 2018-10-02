/**
 * Created by kishe56@gmail.com on 2018. 9. 18.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  message: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  receiver: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  CreatedAt: { type: Date, default: Date.now }
});

MessageSchema.index({ CreatedAt: 1 });
module.exports = mongoose.model('Message', MessageSchema);
//# sourceMappingURL=Message.js.map