const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('../../model/UserModel');
const Following = require('../../model/FollowingModel');



async function FollowingSeed(followingCount = 10) {
    try {

        await mongoose.connect(`${ process.env.MONGO_DB }`)
        .then(() => { console.log('Connected database!')})
        .catch((e) => console.log('Not connect database', e))
    
    // Delete old data before add new data
        await Following.deleteMany({});

        const users = await User.find();

        const followingsData = [];

        for (let i = 0; i < followingCount; i++) {
        const user = users[Math.floor(Math.random() * users.length)];

        const randomFollowings = [];
        const followingCountForUser = Math.floor(Math.random() * 10) + 1; 

        for (let j = 0; j < followingCountForUser; j++) {
            const randomFollowing = users[Math.floor(Math.random() * users.length)];
            if (randomFollowing._id.toString() !== user._id.toString()) {
                randomFollowings.push(randomFollowing._id);
            }
        }

        followingsData.push({
            userId: user._id,
            followings: randomFollowings,
        });
        }

        await Following.insertMany(followingsData);
        console.log(`${followingCount} following records have been seeded successfully.`);
    } catch (err) {
        console.error("Error seeding followings:", err);
    } finally {
        mongoose.disconnect();
    }
}

FollowingSeed()

module.exports = FollowingSeed;