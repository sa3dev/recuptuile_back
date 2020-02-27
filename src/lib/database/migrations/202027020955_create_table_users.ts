import Knex from "knex";
import config from "../../../config";

const TABLE_NAME = config.tables.users ;


export function up(k: Knex) {
  return k.schema.hasTable(TABLE_NAME).then(exists => {
    if (!exists) {
        return k.schema.createTable(TABLE_NAME, t => {
            t.increments("id").primary();
            t.string("full_name").notNullable();
            t.string('email').notNullable(); t.unique(['email']);
            t.string("userpassword").notNullable();
            t.string('type').nullable();
            t.string('phonenumber').nullable();
        })
    }
  }).then( (exist)=> {
      return k.schema.table(TABLE_NAME , t =>{
        return function(knex) {
          // Deletes ALL existing entries
          return knex('users').del().then(function () {
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
        }
      })
  })
}

export function down(k: Knex) {
  return k.schema.hasTable(TABLE_NAME).then(exists => {
    if (exists) {
      return k.schema.dropTable(TABLE_NAME);
    }
  });
}
