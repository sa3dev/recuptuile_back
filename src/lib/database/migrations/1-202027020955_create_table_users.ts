import Knex from "knex";
import config from "../../../config";

const TABLE_NAME = config.tables.users ;


export function up(k: Knex) {
  return k.schema.hasTable(TABLE_NAME).then(exists => {
    if (!exists) {
        return k.schema.createTable(TABLE_NAME, t => {
            t.increments("id").primary();
            t.string("full_name").notNullable();
            t.string('email').notNullable(); 
            t.unique(['email']);
            t.string("userpassword").notNullable();
            t.enum('type', ['user', 'livreur', 'admin']).notNullable();
            // t.string('type').nullable();  // user / admin / livreur
            t.string('phonenumber').nullable();
            t.string("adress").nullable();
            // t.decimal("gmap_x" , null).nullable();
            // t.decimal("gmap_y" , null).nullable(); 
        })
    }
  })
  
  // .then(() => {
  //   k.schema.hasTable(TABLE_NAME).then(exist => {
  //     return k.schema.alterTable(TABLE_NAME, t => {
  //       t.enum('type', ['user', 'livreur', 'admin']).notNullable();
  //     });
  //   });
  // });

}

export function down(k: Knex) {
  return k.schema.hasTable(TABLE_NAME).then(exists => {
    if (exists) {
      return k.schema.dropTable(TABLE_NAME);
    }
  });
}
