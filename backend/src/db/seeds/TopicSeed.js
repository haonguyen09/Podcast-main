const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Podcast = require('../../model/PodcastModel');
const Topic = require('../../model/TopicModel');
const { TOTAL_PODCAST } = require('../../constant/Topic_Constant');




async function TopicSeed(topicCount = 10) {
    try {

        await mongoose.connect(`${ process.env.MONGO_DB }`)
            .then(() => { console.log('Connected database!')})
            .catch((e) => console.log('Not connect database', e))

        // Delete old data before add new data
        await Topic.deleteMany({});

        const podcasts = await Podcast.find();

        const topicsData = [];

        for (let i = 0; i < topicCount; i++) {
        const topic = {
            name: faker.lorem.words(2),  
            image: faker.image.imageUrl(),  
            icon: faker.image.imageUrl(100, 100, 'icon', true),  
            totalPodcast: TOTAL_PODCAST,  
            podcasts: []  
        };

    
        const numberOfPodcasts = Math.floor(Math.random() * 5) + 1;  

        for (let j = 0; j < numberOfPodcasts; j++) {
            const randomPodcast = podcasts[Math.floor(Math.random() * podcasts.length)];
            topic.podcasts.push(randomPodcast._id);  
        }

        topicsData.push(topic);
        }

        await Topic.insertMany(topicsData);
        console.log(`${topicCount} topics have been seeded successfully.`);
    } catch (err) {
        console.error("Error seeding topics:", err);
    } finally {
        mongoose.disconnect();
    }
}

TopicSeed()

module.exports = TopicSeed;