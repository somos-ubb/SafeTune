// Import required modules
const express = require('express');
const router = express.Router();
const knex = require('../db/knex/knex')

router.get('/', async (req, res) => {
    // Retrieve query parameters (if any)
    const refresh_token = req.cookies.refresh_token;
    const {track_id} = req.query;
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
            return res.status(204).send({resultado:'canción no encontrada'});
        }

        const cancionUsuario = await knex('cancionesUsuario').select('input').where({cancionId: cancion.spotifyId, usuarioId: usuario.spotifyId}).first()
        if(cancionUsuario.input === null){
            return res.status(200).send({resultado:true, letra:cancion.letra})
        }
        return res.status(200).send({resultado:false, letra:null})
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Export the router to use in your main app
module.exports = router;