exports.up = function(knex, Promise) {
  return knex.schema.createTable('photos',function(table){
    table.increments();
    table.string('url').notNullable();
    table.string('caption');
    table.integer('user_id').unsigned().index().references('users.id').notNullable().onDelete('cascade');
    table.integer('place_id').unsigned().index().references('places.id').notNullable().onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photos');
};