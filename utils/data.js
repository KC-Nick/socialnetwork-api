const mongoose = require('mongoose');

const usernames = [
    'gerrylee54',
    'pixiegrrrl',
    'trextony',
    'anon457832',
    'str4wb3rry',
    'thunderc4tsRloose',
    'skol698',
    'underdoggone'
];

const emails = [
    'totally2tubular2@yahoo.com',
    'supersailor554@gmail.com',
    'mostawesomeeverrr7@gmail.com',
    'funtimefungi229@gmail.com',
    'gogogadgetemail@yahoo.com',
    'coffeeeveryday@yahoo.com',
    'mycatsrcuterthanurs@yahoo.com',
    'pineapplepizzaftw@yahoo.com',
]

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUser = () =>
    `${getRandomArrItem(usernames)}`;

const getRandomEmail = () =>
    `${getRandomArrItem(emails)}`

// function to generate a valid ObjectId
function generateObjectId() {
    return new mongoose.Types.ObjectId();
}


module.exports = { getRandomUser, getRandomEmail, generateObjectId };