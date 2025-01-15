exports.up = function(knex) {
    return knex.schema.createTable('canciones', function(table) {
        table.string('spotifyId').primary();
        table.string('nombre').notNullable();
        table.string('artista').notNullable();
        table.text('letra');
        table.boolean('esViolenta');
        table.string('album');
        table.boolean('explicita').defaultTo(false);
        table.integer('popularidad');
        table.string('idioma');
        table.timestamps(true, true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('canciones');
};