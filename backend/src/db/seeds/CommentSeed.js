const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('../../model/UserModel');
const Podcast = require('../../model/PodcastModel');
const Comment = require('../../model/CommentModel');


    async function CommentSeed(commentCount = 10) {
        try {

            await mongoose.connect(`${ process.env.MONGO_DB }`)
                .then(() => { console.log('Connected database!')})
                .catch((e) => console.log('Not connect database', e))
            
            // Delete old data before add new data
            await Comment.deleteMany({});

            // Take all User & Podcast to create userId & podcastId
            const users = await User.find();
            const podcasts = await Podcast.find();

            const comments = [];

            // Create random comment
            for (let i = 0; i < commentCount; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomPodcast = podcasts[Math.floor(Math.random() * podcasts.length)];

            const comment = {
                content: faker.lorem.sentence(),
                userId: randomUser._id,
                podcastId: randomPodcast._id,
            };

            comments.push(comment);
            }

            // Insert all comment in DB
            await Comment.insertMany(comments);
            console.log(`${commentCount} comments have been seeded successfully.`);
        } catch (err) {
            console.error("Error seeding comments:", err);
        } finally {
            mongoose.disconnect();
        }
    }

    CommentSeed();
    
    
    module.exports = CommentSeed;
