const connection = require('../config/connection');
const mongoose = require('mongoose');
const { User } = require('../models');
const { getRandomUser, getRandomEmail } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // delete the collections if they exist
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtsCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let reactionsCheck = await connection.db.listCollections({ name: 'reactions' }).toArray();
  if (reactionsCheck.length) {
    await connection.dropCollection('reactions');
  }

  let friendsCheck = await connection.db.listCollections({ name: 'friends' }).toArray();
  if (friendsCheck.length) {
    await connection.dropCollection('friends');
  }

  const generateUniqueEmail = (existingEmails) => {
    let email = getRandomEmail();

    //check if email is in the existingEmails array
    while (existingEmails.includes(email)) {
      email = getRandomEmail();
    }

    return email;
  };

  const existingEmails = [];

  const email = generateUniqueEmail(existingEmails);

  // function to generate a valid ObjectId
  function generateObjectId() {
    return new mongoose.Types.ObjectId();
  }

  // inserts User with unique username and email into database
      let user = await User.create({
        userId: generateObjectId(),
        username: getRandomUser(),
        email
      });

  // log out the seed data to indicate what should appear in the database
  res.json(user);
  console.table(user);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
