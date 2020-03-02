import Knex from "knex";
import config from "../../../config";

const TABLE_NAME = config.tables.livraison;

export function up(k: Knex) {
    return k.schema.hasTable(TABLE_NAME).then(exists => {
        if (!exists) {
            return k.schema.createTable(TABLE_NAME, t => {
                t.increments("id").primary();
                t.integer("user_id").unsigned().notNullable();
                t.integer("passage_id").unsigned().notNullable();
            });
        }
    })
        .then(() => {
            k.schema.hasTable(TABLE_NAME).then(exist => {
                return k.schema.table(TABLE_NAME, t => {
                    t.foreign("user_id").references("id").inTable("users");
                    t.foreign("passage_id").references("id").inTable("passage");
                });
            });
        });
}

export function down(k: Knex) {
    return k.schema.hasTable(TABLE_NAME).then(exists => {
        if (exists) {
            return k.schema.dropTable(TABLE_NAME);
        }
    });
}
