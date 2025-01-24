const express = require('express');
const router = express.Router();
const knex = require('../db/knex/knex')
const scrape = require('../utility/scraper');

// Manejador de ruta POST para guardar la canción
router.post('/', async (req, res) => {
    const refresh_token = req.cookies.refresh_token;
    const { spotifyId, nombreCancion, artist, album, explicit, popularity } = req.body;
    try {
        // Verificar si el usuario existe
        const usuario = await knex('usuarios').where({ refreshToken: refresh_token }).first();
        if (!usuario) {
            // Si el usuario no existe, devuelve un error
            return res.status(404).send('Usuario no encontrado');
        }
        
        // Verificar si la canción existe
        const cancion = await knex('canciones').where({ spotifyId: spotifyId }).first();
        
        let letra = "";

        if(cancion && cancion.letra){
            letra = cancion.letra;
        }
        if (!cancion || !cancion.letra) {
            letra = await scrape(nombreCancion, artist);
            // Si la canción no existe, insertela en la base de datos
            await knex('canciones')
            .insert({
                spotifyId,
                nombre: nombreCancion,
                artista: artist,
                album,
                explicita: explicit,
                popularidad: popularity,
                letra
            })
            .onConflict('spotifyId')
            .merge({
                explicita: explicit,
                popularidad: popularity,
            });
        }

        const cancionUsuario = await knex('cancionesUsuario').where({cancionId: spotifyId, usuarioId: usuario.spotifyId}).first();

        console.log(cancionUsuario);

        if(!cancionUsuario){
            await knex('cancionesUsuario')
            .insert({
                usuarioId: usuario.spotifyId,
                cancionId: spotifyId,
                timeListen: 0
            })
        }
        res.status(200).send({id:spotifyId, letra});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Define los modelos Usuario y Cancion aquí

module.exports = router;
