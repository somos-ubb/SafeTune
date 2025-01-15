const { exec } = require('child_process');

// Define the Python script path and song data
const algoritmoBert = 'app/utility/model/algoritmo.py';

async function evaluateSong(songData) {
    return new Promise((resolve, reject) => {
        // Construct the command to execute the Python script
        const command = `python3 ${algoritmoBert} "${songData}"`;

        // Execute the Python script
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error executing Python script: ${error}`);
                return;
            }
            // Parse the result from stdout
            const result = stdout.trim().split(' ');
            // Convert the first part to boolean
            const isViolent = Boolean(parseInt(result[0]));
            // Extract the language
            const language = result[1];
            // Resolve with the result object
            resolve({ isViolent, language });
        });
    });
}

module.exports = evaluateSong;
