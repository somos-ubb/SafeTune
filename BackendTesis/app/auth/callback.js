// auth/callback.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require('querystring');
const dotenv = (require("dotenv").config()).parsed
const knex = require('../db/knex/knex')

router.get('/', async (req, res) => {
    let code = req.query.code || null; 
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies['spotify_auth_state'] : null;
    if (state === null || state !== storedState) {
        res.redirect('/' +
            qs.stringify({
                error: 'state_mismatch'
            }));
    }
    else if (code === null){
        res.redirect('/error?code=407&message=Se necesita autenticación en Spotify.');
    }
    else{
        res.clearCookie('spotify_auth_state');
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(dotenv.SPOTIFY_CLIENT_ID + ':' + dotenv.SPOTIFY_CLIENT_SECRET).toString('base64')) 
            },
            data: qs.stringify({ // Convert form data to a query string
                client_id: dotenv.SPOTIFY_CLIENT_ID,
                code: code,
                redirect_uri: dotenv.REDIRECT_URI,
                grant_type: 'authorization_code',
            })
        };
        try {
            const response = await axios.post(authOptions.url, authOptions.data, {
                headers: authOptions.headers // Pass headers separately
            });
        
            const responseUser = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': `Bearer ${response.data.access_token}`
                }
            });
            const adminEmails = process.env.ADMIN_EMAILS.split(',');
            // Check if the email from Spotify matches any of the admin emails
            const isAdmin = adminEmails.includes(responseUser.data.email);
            const existingUser = await knex('usuarios')
                .where('spotifyId', responseUser.data.id)
                .first();

            // Set the value of restrictivo based on whether the user exists
            const restrictivo = existingUser ? !!existingUser.restrictivo : true;

            await knex('usuarios')
                .insert({
                    spotifyId: responseUser.data.id,
                    nombre: responseUser.data.display_name,
                    email: responseUser.data.email,
                    suscripcion: responseUser.data.product,
                    sinExplicito: responseUser.data.explicit_content.filter_enabled,
                    refreshToken: response.data.refresh_token,
                    admin: isAdmin,
                    restrictivo,
                })
                .onConflict('spotifyId') // Specify the conflict resolution column
                .merge({
                    nombre: responseUser.data.display_name,
                    email: responseUser.data.email,
                    suscripcion: responseUser.data.product,
                    sinExplicito: responseUser.data.explicit_content.filter_enabled,
                    refreshToken: response.data.refresh_token,
                    updatedAt: knex.fn.now()
                });
            if(responseUser.data.product==='premium'){
                res.cookie('access_token', response.data.access_token);
                res.cookie('refresh_token', response.data.refresh_token, { httpOnly: true });
                let expiresIn = response.data.expires_in * 1000; // Convertir segundos a milisegundos
                let now = new Date();
                let expires = new Date(now.getTime() + expiresIn);
                expires = expires.toISOString();
                res.cookie('expires', expires);
                res.cookie('restrictivo', +restrictivo);
                res.redirect(`/`);
            }
            else{
                res.redirect('/error?code=403&message=Se necesita Spotify Premium.');
            }
        } catch (error) {
            console.error(error);
            res.redirect('/error?code=407&message=Se necesita autorización del administrador.');
    }};
});

module.exports = router;