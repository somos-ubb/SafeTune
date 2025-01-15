exports.up = function(knex) {
    return knex.schema.createTable('usuarios', function(table) {
        table.string('spotifyId').primary();
        table.string('nombre').notNullable();
        table.string('email').notNullable().unique();
        table.string('suscripcion').notNullable();
        table.boolean('sinExplicito').notNullable();
        table.string('refreshToken').notNullable().unique();
        table.boolean('admin').notNullable();
        table.boolean('restrictivo').notNullable();
        table.timestamps(true, true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('usuarios');
};