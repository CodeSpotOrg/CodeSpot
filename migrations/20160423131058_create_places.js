exports.up = function(knex, Promise) {
  return knex.schema.createTable('places',function(table){
    table.increments();
    table.string('name').notNullable();
    table.string('address').notNullable();
    table.string('lat');
    table.string('lng');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('places');
};
