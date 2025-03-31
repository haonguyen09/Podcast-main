const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const SuggestFollow = require('../../model/SuggestFollowModel');
const User = require('../../model/UserModel');


async function SuggestFollowSeed(suggestFollowCount = 10) {
    try {
        await mongoose.connect(`${ process.env.MONGO_DB }`)
                .then(() => { console.log('Connected database!')})
                .catch((e) => console.log('Not connect database', e))

        // Delete old data before add new data
        await SuggestFollow.deleteMany({});

        const users = await User.find();

        const suggestFollowsData = [];

        for (let i = 0; i < suggestFollowCount; i++) {
        const user = users[Math.floor(Math.random() * users.length)];

        const suggestFollowUsers = [];
        const numberOfSuggestions = Math.floor(Math.random() * 5) + 1; 
        for (let j = 0; j < numberOfSuggestions; j++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            if (randomUser._id.toString() !== user._id.toString()) {
            suggestFollowUsers.push(randomUser._id);
            }
        }

        const suggestFollow = {
            userId: user._id,
            suggestFollows: suggestFollowUsers,
        };

        suggestFollowsData.push(suggestFollow);
        }

        await SuggestFollow.insertMany(suggestFollowsData);
        console.log(`${suggestFollowCount} suggestFollow records have been seeded successfully.`);
    } catch (err) {
        console.error("Error seeding suggestFollows:", err);
    } finally {
        mongoose.disconnect();
    }
}

SuggestFollowSeed()

module.exports = SuggestFollowSeed;