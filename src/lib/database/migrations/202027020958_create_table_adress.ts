import Knex from "knex";
import config from "../../../config";

const TABLE_NAME = config.tables.adress;

export function up(k: Knex) {
    return k.schema.hasTable(TABLE_NAME).then(exists => {
        if (!exists) {
            return k.schema.createTable(TABLE_NAME, t => {
                t.increments("id").primary();
                t.string("adress").nullable();
                t.integer("user_id").unsigned().notNullable();
                t.decimal("gmap_x").nullable();
                t.decimal("gmap_y").nullable();
            });
        }
    }).then( ()=> {
        k.schema.hasTable(TABLE_NAME).then( (exist) => {
            return k.schema.table(TABLE_NAME , t => {
                t.foreign('user_id').references('id').inTable('users');
            })
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
