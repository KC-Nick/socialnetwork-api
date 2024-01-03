const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomUser, getRandomEmail } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
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


  // Create empty array to hold thoughts
  // const thoughts = [];

  // adds 2 thoughts to the thoughts array
  // for (let i = 0; i < 2; i++) {
  //   const thoughtText = getRandomThought(2);
  //   const reactions = getRandomReact();

  //   thoughts.push({
  //     thoughtText,
  //     reactions,
  //   });
  // }

  //adds many thoughts to the model and awaits results
  // const thoughtData = await Thought.insertMany(thoughts);

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

  // inserts User with unique username and email into database
  await User.insertOne({ 
    username: getRandomUser(), 
    email });

  // Log out the seed data to indicate what should appear in the database
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
