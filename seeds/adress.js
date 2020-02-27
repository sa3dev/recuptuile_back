
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('adress').del()
    .then(function () {
      // Inserts seed entries
      return knex('adress').insert([
          {
            id: 1,
            adress: "123 boulevard generale de gaulle",
            user_id: 1,
            gmap_x: 89.34,
            gmap_y: -23.34
          }
      ]);
    });
};
