const mongoose = require('mongoose');
const faker = require('faker');
const Podcast = require('../../model/PodcastModel');
const { LIKESCOUNT, VIEWSCOUNT, RATING, RATINGCOUNT, RATINGAVE } = require('../../constant/Podcast_Constant');

const PodcastSeed = async () => {
    try {
        await mongoose.connect(`${ process.env.MONGO_DB }`)
                .then(() => { console.log('Connected database!')})
                .catch((e) => console.log('Not connect database', e))

        // Delete old data before add new data
        await Podcast.deleteMany({});

        // Podcast seed use faker
        const podcasts = [];

        for (let i = 0; i < 10; i++) {
            podcasts.push({
                title: faker.lorem.sentence(),              
                description: faker.lorem.paragraph(),         
                status: faker.random.arrayElement(['active', 'inactive']),  
                likesCount: LIKESCOUNT,
                viewsCount: VIEWSCOUNT,
                duration: faker.random.number({ min: 30, max: 180 }), 
                rating: RATING,
                ratingCount: RATINGCOUNT,
                ratingAve: RATINGAVE,
                image: faker.image.imageUrl(),               
                audio: faker.internet.url(),                 
            });
        }

        // Insert data in DB
        await Podcast.insertMany(podcasts);
        console.log('Podcasts seeded successfully');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.disconnect();
    }
};

PodcastSeed()

module.exports = PodcastSeed;