exports.up = function(knex, Promise) {
  return knex.schema.createTable('places',function(table){
    table.increments();
    table.string('name').notNullable();
    table.string('address').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('places');
};
