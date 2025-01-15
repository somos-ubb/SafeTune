const express = require('express');
const router = express.Router();
const scrape = require('../utility/scraper');
const evaluateSong = require('../utility/bert');
const knex = require('../db/knex/knex')

// Manejador de ruta POST para guardar la canción
router.post('/', async (req, res) => {
    const refresh_token = req.cookies.refresh_token;
    const spotifyId = req.body.spotifyId;
    try {
        // Verificar si el usuario existe
        const usuario = await knex('usuarios').where({ refreshToken: refresh_token }).first();
        if (!usuario) {
            // Si el usuario no existe, devuelve un error
            res.status(404).send('Usuario no encontrado');
        }
        // Verificar si la canción existe
        const cancion = await knex('canciones').where({ spotifyId: spotifyId }).first();
        let esViolenta = null;
        if (!cancion){
            res.status(204).send('Cancion no encontrada');
        }
        const cancionUsuario = await knex('cancionesUsuario').where({cancionId: spotifyId, usuarioId: usuario.spotifyId}).first();
        if (!cancionUsuario){
            res.status(204).send('Cancion de Usuario no encontrada');
        }
        const input = cancionUsuario.input;
        if (cancion && cancion.esViolenta !== null){
            esViolenta = cancion.esViolenta;
        }
        else if (cancion && cancion.esViolenta === null) {
            // Si la canción no existe, scrape la letra, evalúa si es violenta y crea un nuevo registro en la tabla "canciones"
            const algoritmoResult = cancion.letra ? await evaluateSong(cancion.letra) : null;
            esViolenta = algoritmoResult ? algoritmoResult.isViolent : algoritmoResult;
            const idioma = algoritmoResult ? algoritmoResult.language : algoritmoResult;
            await knex('canciones').where({ spotifyId: spotifyId }).update({
                esViolenta,
                idioma,
                updatedAt: knex.fn.now()
            });
        } 
        res.status(200).send({esViolenta, input});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Define los modelos Usuario y Cancion aquí

module.exports = router;
