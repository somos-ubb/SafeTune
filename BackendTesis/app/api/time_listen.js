const express = require('express');
const router = express.Router();
const knex = require('../db/knex/knex')

router.post('/', async (req, res) => {
    const refresh_token = req.cookies.refresh_token;
    const { previous_track, time_listen } = req.body;
    try {
        // Step 1: Search for usuario using refresh token
        const usuario = await knex('usuarios').where({ refreshToken: refresh_token }).first();

        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Step 2: Search for cancion using previous_track
        const cancion = await knex('canciones').where({ spotifyId: previous_track }).first();

        if (!cancion) {
            return res.status(204).send('Canción no encontrada');
        }
        

        const cancionUsuario = await knex('cancionesUsuario').where({cancionId: previous_track, usuarioId: usuario.spotifyId}).first();
        if (!cancionUsuario){
            res.status(204).send('Cancion de Usuario no encontrada');
        }

        // Step 3: Search for cancionesUsuario using spotifyId from usuario and cancion
        await knex('cancionesUsuario')
            .insert({
                usuarioId: usuario.spotifyId,
                cancionId: cancion.spotifyId,
                timeListen: time_listen
            })
            .onConflict(['usuarioId', 'cancionId'])
            .merge({
                timeListen: knex.raw('cancionesUsuario.timeListen + ?', [time_listen]),
                updatedAt: knex.fn.now()
            });

        res.status(200).send('Time listen guardado exitosamente');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
