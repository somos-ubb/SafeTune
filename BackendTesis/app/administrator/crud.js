const express = require('express');
const router = express.Router();
const knex = require('../db/knex/knex');
const authenticate = require('./middleware/authenticate'); // Adjust the path as needed

// Apply the middleware to routes that need protection
router.post('/permission', authenticate, async (req, res) => {
    res.json(req.user.admin);
});

// Routes for managing users
router.get('/users', authenticate, async (req, res) => {
    const columnsToSelect = [
        'spotifyId',
        'nombre',
        'email',
        'suscripcion',
        'sinExplicito',
        'admin',
        'restrictivo'
    ];
    try {
        const users = await knex.select(columnsToSelect).table('usuarios');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Routes for managing songs
router.get('/songs', authenticate, async (req, res) => {
    const columnsToSelect = [
        'spotifyId',
        'nombre',
        'artista',
        'explicita',
        'popularidad',
        'idioma',
        'esViolenta',
        'letra'
    ];
    try {
        const songs = await knex.select(columnsToSelect).table('canciones');
        res.json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Routes for managing user-song relationships
router.get('/user-songs/:usuarioId', authenticate, async (req, res) => {
    const columnsToSelect = [
        'canciones.spotifyId',
        'canciones.nombre',
        'canciones.artista',
        'canciones.explicita',
        'canciones.popularidad',
        'canciones.idioma',
        'canciones.esViolenta',
        'cancionesUsuario.timeListen',
        'cancionesUsuario.input',
        'canciones.letra'
    ];
    try {
        const { usuarioId } = req.params;
        const userSongs = await knex('usuarios')
            .join('cancionesUsuario', 'usuarios.spotifyId', 'cancionesUsuario.usuarioId')
            .join('canciones', 'cancionesUsuario.cancionId', 'canciones.spotifyId')
            .select(columnsToSelect)
            .where('cancionesUsuario.usuarioId', usuarioId);
        res.json(userSongs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;