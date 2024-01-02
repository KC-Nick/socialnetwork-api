const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/socialnetDB';

connect(connectionString);

module.exports = connection;