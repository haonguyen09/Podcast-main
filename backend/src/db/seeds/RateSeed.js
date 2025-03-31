const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Podcast = require('../../model/PodcastModel');
const Rate = require('../../model/RateModel');
const User = require('../../model/UserModel');
const { RATING_MAX, RATING_MIN, RATING_DEFAULT } = require('../../constant/Rate_Constant');


async function RateSeed(rateCount = 10) {
    try {

        await mongoose.connect(`${ process.env.MONGO_DB }`)
                .then(() => { console.log('Connected database!')})
                .catch((e) => console.log('Not connect database', e))

        // Delete old data before add new data
        await Rate.deleteMany({});

        const users = await User.find();
        const podcasts = await Podcast.find();

        const ratesData = [];

        for (let i = 0; i < rateCount; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const podcast = podcasts[Math.floor(Math.random() * podcasts.length)];

        const isRating = Math.random() < 0.5; 
        const rating = isRating ? Math.floor(Math.random() * (RATING_MAX - RATING_MIN + 1)) + RATING_MIN : RATING_DEFAULT;

        const rate = {
            podcastId: podcast._id,
            userId: user._id,
            isRating: isRating,
            Rating: rating,
        };

        ratesData.push(rate);
        }

        await Rate.insertMany(ratesData);
        console.log(`${rateCount} rates have been seeded successfully.`);
    } catch (err) {
        console.error("Error seeding rates:", err);
    } finally {
        mongoose.disconnect();
    }
}

RateSeed()

module.exports = RateSeed;
