
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('passage').del()
    .then(function () {
      // Inserts seed entries
      return knex('passage').insert([
            {
                adress_id: 1,
                superficies: 90,
                dateofpassage: "12/12/2020",
                isDatePassed: 0
            },
            {
                adress_id: 1,
                superficies: 120,
                dateofpassage: "13/12/2020",
                isDatePassed: 0
            },
            {
                adress_id: 2,
                superficies: 90,
                dateofpassage: "12/12/2019",
                isDatePassed: 1
            },
      ]);
    });
};
