const connection = require('../config/connection');
const { User } = require('../models');
const { getRandomUser, getRandomEmail, generateObjectId } = require('./data');

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

  const generateUniqueUser = (existingUsers) => {
    let username = getRandomUser();

    while (existingUsers.includes(username)) {
      username = getRandomUser();
    }

    return username;
  };

  const numUsers = 5;
  const existingEmails = [];
  const existingUsers = [];

  const userPromises = Array.from({ length: numUsers }).map(() => {
    const email = generateUniqueEmail(existingEmails);
    existingEmails.push(email);
    const username = generateUniqueUser(existingUsers);
    existingUsers.push(username);

    return User.create({
      userId: generateObjectId(),
      username,
      email
    });
  });

  Promise.all(userPromises)
    .then(() => console.info('Seeding complete! 🌱'))
    .catch(err => console.error(err))
    .finally(() => process.exit(0));
});
