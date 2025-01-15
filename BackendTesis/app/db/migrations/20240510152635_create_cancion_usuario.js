exports.up = function(knex) {
    return knex.schema.createTable('cancionesUsuario', function(table) {
        table.string('usuarioId');
        table.string('cancionId');
        table.integer('timeListen');
        table.boolean('input')
        table.primary(['usuarioId', 'cancionId']);
        table.foreign('usuarioId').references('usuarios.spotifyId');
        table.foreign('cancionId').references('canciones.spotifyId');
        table.timestamps(true, true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cancionesUsuario');
};