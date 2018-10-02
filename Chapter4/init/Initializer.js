/**
 * Created by kishe56@gmail.com on 2018. 7. 9.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

exports.InitMongoDB = (env,mongoose)=>{
  if(env.VCAP_SERVICES){
    /**
     * Cloud환경
     *
     * https://console.bluemix.net/docs/cli/index.html#overview
     */
    const connectURL = 'mongodb://admin:admin123@ds129811.mlab.com:29811/firstexample';
    const options = {
      connectTimeoutMS: 4000,
      keepAlive:true,
      ha:true,
      autoReconnect:true,
      reconnectTries:30
    };
    mongoose.connect(connectURL,options);
    const db = mongoose.connection;
    db.on('open',()=>{
      console.log('connected');
    });
  }else{
    /**
     * Local
     *
     mongodb://<dbuser>:<dbpassword>@ds129811.mlab.com:29811/firstexample
     */
    const connectURL = 'mongodb://admin:admin123@ds129811.mlab.com:29811/firstexample';
    const options = {
      connectTimeoutMS: 4000,
      keepAlive:true,
      ha:true,
      autoReconnect:true,
      reconnectTries:30
    };
    mongoose.connect(connectURL,options);
    const db = mongoose.connection;
    db.on('open',()=>{
      console.log('connected');
    });
  }
};