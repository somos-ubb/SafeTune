// Import required modules
const express = require('express');
const router = express.Router();
const knex = require('../db/knex/knex')

// Route handler for GET request
router.post('/', async (req, res) => {
    // Retrieve query parameters (if any)
    let refresh_token = req.cookies.refresh_token;
    let {realimentacion, track_id} = req.body;
    try {
        // 1. Search for user with the given refresh token
        const usuario = await knex('usuarios')
            .where({ refreshToken: refresh_token })
            .first();
        // 2. If no user, return error
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const cancion = await knex('canciones').where({ spotifyId: track_id }).first();

        if (!cancion) {
            return res.status(204).send('Canción no encontrada');
        }
        // 3. If user is found, update restrictivo column
        // Step 3: Search for cancionesUsuario using spotifyId from usuario and cancion
        await knex('cancionesUsuario')
            .insert({
                usuarioId: usuario.spotifyId,
                cancionId: cancion.spotifyId,
                input:realimentacion
            })
            .onConflict(['usuarioId', 'cancionId'])
            .merge({
                input:realimentacion,
                updatedAt: knex.fn.now()
            });

        res.status(200).send('Realimentacion guardado exitosamente');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export the router to use in your main app
module.exports = router;