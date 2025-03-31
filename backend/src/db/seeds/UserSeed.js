const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { FOLLOWERS_COUNT, FOLLOWINGS_COUNT } = require('../../constant/User_Constant');
const User = require('../../model/UserModel');




async function UserSeed(userCount = 10) {
    try {
        const usersData = [];

        for (let i = 0; i < userCount; i++) {
        const user = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            avatar: faker.image.avatar(),
            occupation: faker.name.jobTitle(),
            role: faker.random.arrayElement(['admin', 'user']),
            mediaSociety: faker.company.companyName(),
            featuredPodcast: faker.random.arrayElement([faker.lorem.words(3), null]),
            followersCount: FOLLOWERS_COUNT,  
            followingsCount: FOLLOWINGS_COUNT,  
            followerId: null,  
            followingId: null,  
            suggestFollow: null,  
            teams: [],  
            topics: [],  
            playlists: [], 
        };

        usersData.push(user);
        }

        const createdUsers = await User.insertMany(usersData);
        console.log(`${userCount} users have been seeded successfully.`);

        for (const user of createdUsers) {
        const followers = [];
        const followings = [];

        for (let i = 0; i < user.followersCount; i++) {
            const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
            if (randomUser._id.toString() !== user._id.toString()) {
            followers.push(randomUser._id);
            }
        }

        for (let i = 0; i < user.followingsCount; i++) {
            const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
            if (randomUser._id.toString() !== user._id.toString()) {
            followings.push(randomUser._id);
            }
        }

        await User.updateOne(
            { _id: user._id },
            { $set: { followerId: followers, followingId: followings } }
        );
        }

        console.log("Followers and Followings have been updated for each user.");

    } catch (err) {
        console.error("Error seeding users:", err);
    } finally {
        mongoose.disconnect();
    }
}

UserSeed()

module.exports = UserSeed;