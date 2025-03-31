const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('../../model/UserModel');
const Podcast = require('../../model/PodcastModel');
const Playlist = require('../../model/PlaylistModel');


async function PlaylistSeed(playlistCount = 10) {
    try {

        await mongoose.connect(`${ process.env.MONGO_DB }`)
        .then(() => { console.log('Connected database!')})
        .catch((e) => console.log('Not connect database', e))
    
        // Delete old data before add new data
        await Playlist.deleteMany({});

        const users = await User.find();
        const podcasts = await Podcast.find();

        const playlistsData = [];

        for (let i = 0; i < playlistCount; i++) {
            const user = users[Math.floor(Math.random() * users.length)];

            const playlistPodcasts = [];
            const numberOfPodcasts = Math.floor(Math.random() * 5) + 1; 

            for (let j = 0; j < numberOfPodcasts; j++) {
                const randomPodcast = podcasts[Math.floor(Math.random() * podcasts.length)];
                playlistPodcasts.push(randomPodcast._id);
            }

            const playlist = {
                title: faker.lorem.words(3), 
                description: faker.lorem.sentences(2), 
                image: faker.image.imageUrl(), 
                podcasts: playlistPodcasts, 
                userId: user._id, 
            };

            playlistsData.push(playlist);
        }

        await Playlist.insertMany(playlistsData);
        console.log(`${playlistCount} playlists have been seeded successfully.`);
    } catch (err) {
        console.error("Error seeding playlists:", err);
    } finally {
        mongoose.disconnect();
    }
}

PlaylistSeed()

module.exports = PlaylistSeed;