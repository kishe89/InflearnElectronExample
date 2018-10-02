/**
 * Created by kishe56@gmail.com on 2018. 9. 19.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

module.exports = function (message) {
  var Room = require('../../../model/Room');
  return Room.findOne({ _id: message._id }).populate({
    path: 'messages',
    populate: {
      path: 'sender',
      model: 'User'
    }
  });
  // return Room.findOne({_id:message._id})
  //   .populate({
  //     path:'messages',
  //     populate:{
  //       path:'sender',
  //       model:'User'
  //     }
  //   })
  //
  // return Room.findOne({_id:message._id})
  //   .populate({
  //     path:'messages',
  //     options: {
  //       sort: 'CreatedAt'
  //     },
  //     populate:{
  //       path:'sender',
  //       model:'User'
  //     }
  //   })
  //   .where('messages')
  //   .slice(start,count)
};
//# sourceMappingURL=findRoom.js.map