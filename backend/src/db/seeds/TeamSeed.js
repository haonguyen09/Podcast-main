const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Team = require('../../model/TeamModel');
const User = require('../../model/UserModel');



async function TeamSeed(teamCount = 10) {
    try {
    
        await mongoose.connect(`${ process.env.MONGO_DB }`)
            .then(() => { console.log('Connected database!')})
            .catch((e) => console.log('Not connect database', e))

        // Delete old data before add new data
        await Team.deleteMany({});

        const users = await User.find();

        const teamsData = [];

        
        for (let i = 0; i < teamCount; i++) {
        const user = users[Math.floor(Math.random() * users.length)];

        
        const teamMembers = [];
        const numberOfMembers = Math.floor(Math.random() * 5) + 2; 

        for (let j = 0; j < numberOfMembers; j++) {
            const randomMember = users[Math.floor(Math.random() * users.length)];
            if (randomMember._id.toString() !== user._id.toString()) {
            teamMembers.push(randomMember._id);
            }
        }

        const team = {
            name: faker.company.companyName(),  
            userId: user._id,                  
            members: teamMembers,              
        };

        teamsData.push(team);
        }

        await Team.insertMany(teamsData);
        console.log(`${teamCount} teams have been seeded successfully.`);
    } catch (err) {
        console.error("Error seeding teams:", err);
    } finally {
        mongoose.disconnect();
    }
}

TeamSeed()

module.exports = TeamSeed;