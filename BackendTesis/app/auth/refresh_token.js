const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = (require("dotenv").config()).parsed

router.post('/', async (req, res) => {
    let refresh_token = req.cookies.refresh_token;
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(dotenv.SPOTIFY_CLIENT_ID + ':' + dotenv.SPOTIFY_CLIENT_SECRET).toString('base64') 
        },
        data: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }
    };

    try {
        // POR ALGUNA RAZÓN LAS COOKIES NO SE GUARDAN
        const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
        if (response.status === 200) {
            res.cookie('access_token', response.data.access_token);
            let expiresIn = response.data.expires_in * 1000;
            let now = new Date();
            let expires = new Date(now.getTime() + expiresIn);
            expires = expires.toISOString();
            res.cookie('expires', expires)
            res.status(200).json({ access_token: response.data.access_token });
        }
    } catch (error) {
        // Handle error
        console.error('Error:', error);
        // Send appropriate response or handle error
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;