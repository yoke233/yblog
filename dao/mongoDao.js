var mongoIp = '127.0.0.1',
    mongoPort = 27017,
    mongoDbName = 'yblog',
    user = '',
    pass = '';

if(process.env.OPENSHIFT_MONGODB_DB_HOST)
{
    mongoIp = process.env.OPENSHIFT_MONGODB_DB_HOST;
    mongoPort = process.env.OPENSHIFT_MONGODB_DB_PORT;
    user = 'admin';
    pass = '1Gn7nTI5Cuyz';
}

module.exports = {
  db: require('mongoskin').db(user + ':' + pass + '@' + mongoIp + ':' + mongoPort + '/?auto_reconnect=true', {
        database: mongoDbName,
        safe:true
    })
};
/*
MongoDB 2.2 database added.  Please make note of these credentials:
   Root User:     admin
   Root Password: 1Gn7nTI5Cuyz
   Database Name: yread
Connection URL: mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/
*/