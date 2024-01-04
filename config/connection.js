const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/socialnetDB';

connect(connectionString);

connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

module.exports = connection;