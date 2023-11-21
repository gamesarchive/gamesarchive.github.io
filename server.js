// server.js

const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/blacklist', (req, res) => {
    // Read the content of the text/bw.txt file
    fs.readFile('text/bw.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Split the file content into an array of words
        const blacklistWords = data.split('\n').map(word => word.trim().toLowerCase());

        // Send the list of blacklisted words to the client
        res.json({ blacklist: blacklistWords });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
