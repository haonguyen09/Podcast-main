const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CommentSeed = require('./CommentSeed');
const UserSeed = require('./UserSeed');
const FollowerSeed = require('./FollowerSeed');
const FollowingSeed = require('./FollowingSeed');
const LikeSeed = require('./LikeSeed');
const PlaylistSeed = require('./PlaylistSeed');
const PodcastSeed = require('./PodcastSeed');
const RateSeed = require('./RateSeed');
const SuggestFollowSeed = require('./SuggestFollowSeed');
const TeamSeed = require('./TeamSeed');
const TopicSeed = require('./TopicSeed');
dotenv.config();

async function seedAll() {
    try {
        // Connect to MongoDB
        await mongoose.connect(`${process.env.MONGO_DB}`)
            .then(() => { console.log('Connected database!')})
            .catch((e) => console.log('Not connect database', e))


        // Seed the data by calling each seed function
        await UserSeed();
        await CommentSeed();
        await FollowerSeed();
        await FollowingSeed();
        await LikeSeed();
        await PlaylistSeed();
        await PodcastSeed();
        await RateSeed();
        await SuggestFollowSeed();
        await TeamSeed();
        await TopicSeed();

        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Error during seeding:', err);
    } finally {
        // Disconnect from the database
        mongoose.disconnect();
    }
}

// Run the seeding process
seedAll();
