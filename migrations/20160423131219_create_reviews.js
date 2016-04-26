exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews',function(table){
    table.increments();
    table.text('content').notNullable();
    table.integer('user_id').unsigned().index().references('users.id').notNullable().onDelete('cascade');
    table.integer('place_id').unsigned().index().references('places.id').notNullable().onDelete('cascade');
    table.boolean('wifi');
    table.boolean('outlets');
    table.boolean('restrooms');
    table.boolean('food');
    table.boolean('coffee');
    table.boolean('outdoors');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};