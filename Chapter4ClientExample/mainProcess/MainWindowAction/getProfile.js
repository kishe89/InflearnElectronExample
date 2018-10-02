/**
 * Created by kishe56@gmail.com on 2018. 9. 20.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
module.exports = (MainEvent,TokenManager,event,message)=>{
  event.sender.send(MainEvent,TokenManager.getId());
};