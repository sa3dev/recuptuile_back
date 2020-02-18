import Knex from "knex";
import config from "../../../config";

const TABLE_NAME = config.tables.passage;
const TABLE_NAME2 = config.tables.adress ;
const TABLE_NAME3 = config.tables.users ;


export function up(k: Knex) {
  return k.schema.hasTable(TABLE_NAME).then(exists => {
    if (!exists) {
        // TABLE PASSAGE
      return k.schema.createTable(TABLE_NAME, t => {
        t.increments("id").primary();
        t.text("adress_id").notNullable();
        t.integer("superficies").nullable();
        t.text("dateofpassage").nullable();
        t.boolean("isDatePassed").notNullable().defaultTo(false);
      })
      .then( (el) => {
          // TABLE ADRESSE
          k.schema.hasTable(TABLE_NAME2).then( exists => { 
              if (!exists) {
                  return k.schema.createTable(TABLE_NAME2 , t => {
                      t.increments('id').primary();
                      t.text('adress').nullable();
                      t.decimal("gmap_x").nullable();
                      t.decimal("gmap_y").nullable();

                      t.foreign('adress_id').references('passage.adress_id')
                  })
              }
          } )
      } )
      .then( el => {
          // TABLE USER
          k.schema.hasTable(TABLE_NAME3).then( exists => {
              if(!exists) {
                    return k.schema.createTable(TABLE_NAME3, t => {
                        t.increments("id").primary();
                        t.string("full_name").notNullable();
                        t.string('email').notNullable();
                        t.unique(['email']);
                        t.string('type').nullable();
                        t.string('phonenumber').nullable();

                        // contraintes clef etrangere
                        t.foreign('id').references('passage.id');
                        
                    });
              }
          })
      });
    }
  });
}

export function down(k: Knex) {
  return k.schema.hasTable(TABLE_NAME).then(exists => {
    if (exists) {
      return k.schema.dropTable(TABLE_NAME)
        .then(el => k.schema.dropTable(TABLE_NAME2))
        .then(el => k.schema.dropTable(TABLE_NAME3));
    }
  });
}
