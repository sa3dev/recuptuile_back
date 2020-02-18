import config from "../config";
import Database from "../lib/database";

export class AnswersTypesService {
  private TABLE: string = 'test' // config.tables.answers_types;

  constructor(private database: Database) {}

  async getAll() {
    try {
      const connection = await this.database.getConnection();
      const types = await connection(this.TABLE);
      return types.map(item => (item));
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      const connection = await this.database.getConnection();
      const ids = await connection(this.TABLE).insert(data);
      return ids[0];
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const connection = await this.database.getConnection();
      return await connection(this.TABLE)
        .where({ id })
        .first();
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: number) {
    try {
      const connection = await this.database.getConnection();
      return await connection(this.TABLE)
        .where({ id })
        .delete();
    } catch (error) {
      throw error;
    }
  }

  async updateById(id: number, data) {
    try {
      const connection = await this.database.getConnection();
      return await connection(this.TABLE)
        .update(data)
        .where({ id });
    } catch (error) {
      throw error;
    }
  }
}
