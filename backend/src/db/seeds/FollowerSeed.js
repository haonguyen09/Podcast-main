const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('../../model/UserModel');
const Follower = require('../../model/FollowerModel');



async function FollowerSeed(followerCount = 10) {
    try {
        await mongoose.connect(`${ process.env.MONGO_DB }`)
        .then(() => { console.log('Connected database!')})
        .catch((e) => console.log('Not connect database', e))
    
    // Delete old data before add new data
        await Follower.deleteMany({});
        
    // Take all to create userId & followers
    const users = await User.find();

    const followersData = [];

    // Create random data
    for (let i = 0; i < followerCount; i++) {
      const user = users[Math.floor(Math.random() * users.length)];

        // Take random followers 
        const randomFollowers = [];
        const followerCountForUser = Math.floor(Math.random() * 10) + 1; 

        for (let j = 0; j < followerCountForUser; j++) {
        const randomFollower = users[Math.floor(Math.random() * users.length)];
        if (randomFollower._id.toString() !== user._id.toString()) {
            randomFollowers.push(randomFollower._id);
        }
        }

        
        followersData.push({
        userId: user._id,
        followers: randomFollowers,
        });
    }

    await Follower.insertMany(followersData);
    console.log(`${followerCount} follower records have been seeded successfully.`);
    } catch (err) {
    console.error("Error seeding followers:", err);
    } finally {
    mongoose.disconnect();
    }
}

FollowerSeed()

module.exports = FollowerSeed;