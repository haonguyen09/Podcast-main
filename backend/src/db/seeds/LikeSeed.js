const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('../../model/UserModel');
const Podcast = require('../../model/PodcastModel');



async function LikeSeed(likeCount = 10) {
    try {
        await mongoose.connect(`${ process.env.MONGO_DB }`)
        .then(() => { console.log('Connected database!')})
        .catch((e) => console.log('Not connect database', e))
    
    // Delete old data before add new data
        await Like.deleteMany({});

    const users = await User.find();
    const podcasts = await Podcast.find();

    const likesData = [];

        for (let i = 0; i < likeCount; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const podcast = podcasts[Math.floor(Math.random() * podcasts.length)];

        const isLike = Math.random() < 0.5; 

        const like = {
            userId: user._id,
            podcastId: podcast._id,
            isLike: isLike,
        };

        likesData.push(like);
        }

        await Like.insertMany(likesData);
        console.log(`${likeCount} likes have been seeded successfully.`);
    } catch (err) {
        console.error("Error seeding likes:", err);
    } finally {
        mongoose.disconnect();
    }
}

LikeSeed()

module.exports = LikeSeed;