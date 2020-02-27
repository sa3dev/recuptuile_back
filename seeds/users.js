
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          full_name: "test-test",
          email: "test@gmail.com",
          userpassword: "$2a$10$mjYKJHLyVHH3bMoAag/so.wYXg8ZIdPzWA.zvnxDKPc5lbo8z7pLe",
          type: "user",
          phonenumber: "0123456789"
        }, 
        {
          id: 2,
          full_name: "admin-admin",
          email: "admin@gmail.com",
          userpassword: "$2a$10$mjYKJHLyVHH3bMoAag/so.wYXg8ZIdPzWA.zvnxDKPc5lbo8z7pLe",
          type: "admin",
          phonenumber: "0123456789"
        }
      ]);
    });
};
