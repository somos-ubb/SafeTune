// auth/login.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require('querystring');
const dotenv = (require("dotenv").config()).parsed
const crypto = require('crypto');

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

router.get('/', (req, res) => {
    let scope = 'user-read-private \
                user-read-email \
                user-read-playback-state \
                user-modify-playback-state \
                user-read-currently-playing \
                playlist-read-private \
                playlist-read-collaborative \
                playlist-modify-private \
                playlist-modify-public \
                app-remote-control \
                user-read-playback-position \
                user-top-read \
                user-read-recently-played \
                user-library-modify \
                user-library-read \
                streaming';

    let state = generateRandomString(16);
    res.cookie('spotify_auth_state', state);
    res.redirect('https://accounts.spotify.com/authorize?' +
    qs.stringify({
        client_id: dotenv.SPOTIFY_CLIENT_ID,
        response_type: "code",
        redirect_uri: dotenv.REDIRECT_URI,
        state: state,
        scope: scope,
    }));
});

module.exports = router;