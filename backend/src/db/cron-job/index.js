const cron = require('node-cron');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

const dbUri = process.env.MONGO_DUMP;  
const backupFolder = "./data/backups/";  
const maxBackupAgeInDays = 7;

cron.schedule('0 2 * * *', () => {
    console.log('Running MongoDB backup job...');
    
    const backupPath = path.join(backupFolder, `backup-${new Date().toISOString().split('T')[0]}`);
    
    const command = `mongodump --uri="${dbUri}" --out="${backupPath}"`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during backup: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`Backup completed successfully. Output: ${stdout}`);
    });

    deleteOldBackups(backupFolder, maxBackupAgeInDays);
});

function deleteOldBackups(folderPath, maxAgeInDays) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(`Error reading backup folder: ${err}`);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`Error checking file stats: ${err}`);
                    return;
                }

                const backupAgeInDays = moment().diff(moment(stats.mtime), 'days');
                if (backupAgeInDays > maxAgeInDays) {
                    console.log(`Deleting old backup: ${filePath}`);
                    fs.rm(filePath, { recursive: true, force: true }, (err) => {
                        if (err) {
                            console.error(`Error deleting backup folder: ${err}`);
                        } else {
                            console.log(`Backup folder ${filePath} deleted successfully.`);
                        }
                    });
                }
            });
        });
    });
}

console.log('MongoDB backup cron job has been scheduled.');
