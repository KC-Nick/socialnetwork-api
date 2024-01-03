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
// const thoughts = [
//     'Here comes a thought...',
//     'I think, therefore I am.',
//     'Why do birds not walk more? Flying seems tiring.',
//     'Get together this weekend at the park!',
//     'I hope my cats like their new food.',
//     'All dogs deserve pets.',
//     'I want a pet panda, they are lazy like me',
//     'I hope to own a candy shop one day.',
//     'Is there life on other planets?',
//     'I miss having cool erasers like in school.',
//     'How many books a year is a good goal?',
//     'Is there a book about lobsters in space?',
//     'How many lobsters could fit on Mars?',
//     'Can a lobster be a good pet?',
//     'Can you regonize constellations?',
//     'Are there any LARP fans here?',
//     'The Earth is so huge!',
//     'Wow, flowers are pretty.',
//     'I LOVE GARLIC!',
//     'Howdy everyone!',
// ];

// const reactions = [
//     'Awesome thought!',
//     'This is great.',
//     'Totally agree.',
//     'Mood.',
//     'Thumbs up!',
//     'Wow, never thought of it that way.',
//     'That is crazy.',
//     'What the heck?',
//     'Are you okay?',
//     'Not sure about this.',
//     'Who knows?',
//     'Absolutely!',
//     '...',
//     'What?',
//     'I know, right?',
//     'Dunno.',
//     'Who cares?',
// ]

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUser = () =>
    `${getRandomArrItem(usernames)}`;

const getRandomEmail = () =>
    `${getRandomArrItem(emails)}`
// const getRandomReact = () =>
//     `${getRandomArrItem(reactions)}`;

// //get random thought
// const getRandomThought = (th) => {
//     const thoughtPosts = [];
//     for (let i = 0; i < th; i++) {
//         thoughtPosts.push({
//             thoughtText: getRandomArrItem(thoughts)
//         });
//     }
//     return thoughtPosts;
// };

module.exports = { getRandomUser, getRandomEmail };
//getRandomThought, getRandomReact