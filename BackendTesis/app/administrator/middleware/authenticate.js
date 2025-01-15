const express = require('express');
const knex = require('../../db/knex/knex');

const authenticate = async (req, res, next) => {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) {
        return res.status(404).json({ message: 'Not found' });
    }

    try {
        const user = await knex('usuarios').where({ refreshToken: refresh_token }).first();

        if (!user || !user.admin) {
            return res.status(404).json({ message: 'Not found' });
        }

        req.user = user; // Attach the user object to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authenticate;