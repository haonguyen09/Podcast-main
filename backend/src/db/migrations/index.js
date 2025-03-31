const mongoose = require('mongoose');

async function up(collectionName, fieldName, fieldValue) {
    const db = mongoose.connection;

    try {
        const collection = db.collection(collectionName);

        const existingField = await collection.findOne({ [fieldName]: { $exists: true } });

        if (!existingField) {
            console.log(`Adding field ${fieldName} to ${collectionName} collection`);
            await collection.updateMany({}, { $set: { [fieldName]: fieldValue } });
            console.log(`Field ${fieldName} added successfully.`);
        } else {
            console.log(`Field ${fieldName} already exists in ${collectionName}. Skipping addition.`);
        }
    } catch (error) {
        console.error('Error in migration (up): ', error);
    }
}

async function down(collectionName, fieldName) {
    const db = mongoose.connection;

    try {
        const collection = db.collection(collectionName);

        const existingField = await collection.findOne({ [fieldName]: { $exists: true } });

        if (existingField) {
            console.log(`Removing field ${fieldName} from ${collectionName} collection`);
            await collection.updateMany({}, { $unset: { [fieldName]: "" } });
            console.log(`Field ${fieldName} removed successfully.`);
        } else {
            console.log(`Field ${fieldName} does not exist in ${collectionName}. Skipping removal.`);
        }
    } catch (error) {
        console.error('Error in migration (down): ', error);
    }
}

module.exports = { up, down };
