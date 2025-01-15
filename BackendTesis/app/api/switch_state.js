// Import required modules
const express = require('express');
const router = express.Router();
const knex = require('../db/knex/knex')

// Route handler for GET request
router.get('/', async (req, res) => {
    // Retrieve query parameters (if any)
    let refresh_token = req.cookies.refresh_token;
    let restrictivo = parseInt(req.query.restrictivo);
    try {
        // 1. Search for user with the given refresh token
        const usuario = await knex('usuarios')
            .where({ refreshToken: refresh_token })
            .first();

        // 2. If no user, return error
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // 3. If user is found, update restrictivo column
        await knex('usuarios')
            .where({ spotifyId: usuario.spotifyId })
            .update({ restrictivo }); // or the appropriate value
        res.cookie('restrictivo', +restrictivo);
        res.status(200).json({ message: 'Restrictivo column updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export the router to use in your main app
module.exports = router;