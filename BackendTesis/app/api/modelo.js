const express = require('express');
const router = express.Router();
const scrape = require('../utility/scraper');
const evaluateSong = require('../utility/bert');
// Manejador de ruta POST para guardar la canción
router.get('/', async (req, res) => {
    const cancion = req.query.cancion;
    try {
        const letra = await scrape(cancion, "");
        const algoritmoResult = letra ? await evaluateSong(letra) : null;
        const esViolenta = algoritmoResult ? algoritmoResult.isViolent : algoritmoResult;
        res.status(200).send({esViolenta});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Define los modelos Usuario y Cancion aquí

module.exports = router;
