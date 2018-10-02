/**
 * Created by kishe56@gmail.com on 2018. 7. 3.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */

'use strict';

const SocketEvent = require('./event/SocketEvent');

module.exports = [
  {
    event:SocketEvent.CONNECT,
    handler:require('./handler/OnConnect')
  },
  {
    event:SocketEvent.ERROR,
    handler:require('./handler/OnError')
  },
  {
    event:SocketEvent.CONNECT_TIMEOUT,
    handler:require('./handler/OnConnectTimeout')
  },
  {
    event:SocketEvent.DISCONNECT,
    handler:require('./handler/OnDisconnect')
  },
  {
    event:SocketEvent.HELLO,
    handler:require('./handler/OnHello')
  },
  {
    event:SocketEvent.PING,
    handler:require('./handler/OnPing')
  },
  {
    event:SocketEvent.PONG,
    handler:require('./handler/OnPong')
  },
  {
    event:SocketEvent.RECONNECT_ERROR,
    handler:require('./handler/OnReconnectError')
  },
  {
    event:SocketEvent.RECONNECT_FAILED,
    handler:require('./handler/OnReconnectFailed')
  },
  {
    event:SocketEvent.RECONNECTING,
    handler:require('./handler/OnReconnecting')
  }
];