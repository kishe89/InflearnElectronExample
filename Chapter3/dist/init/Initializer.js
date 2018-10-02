/**
 * Created by kishe56@gmail.com on 2018. 7. 9.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

exports.InitMongoDB = function (env, mongoose) {
  return new Promise(function (resolve, reject) {
    if (env.VCAP_SERVICES) {
      /**
       * Cloud환경
       */
    } else {
      /**
       * Local
       *
       mongodb://<dbuser>:<dbpassword>@ds129811.mlab.com:29811/firstexample
       */
      var connectURL = 'mongodb://admin:admin123@ds129811.mlab.com:29811/firstexample';
      var options = {
        connectTimeoutMS: 4000,
        keepAlive: true,
        ha: true,
        autoReconnect: true,
        reconnectTries: 30
      };
      mongoose.connect(connectURL, options);
      var db = mongoose.connection;
      db.on('open', function () {
        console.log('connected');
        return resolve();
      });
    }
  });
};
//# sourceMappingURL=Initializer.js.map