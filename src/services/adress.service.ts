import config from "../config";
import Database from "../lib/database/index";
import AdressModel  from "../models/adress.model";

export default class AdressService {
  private TABLE_NAME: string = config.tables.adress;

  constructor(private database: Database) {}

  /**
   * GET ALL Adress
   */
  async getAllAdress() {
    try {
      const connection = await this.database.getConnection();
      const tableData = await connection(this.TABLE_NAME);
      return tableData.map(item => new AdressModel(item).toJSON());
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param id GET Adress BY ID
   */
  async getAdressById(id: number) {
    try {
      const connection = await this.database.getConnection();
      const tableData = await connection(this.TABLE_NAME);
      return tableData.find(element => element.id === id);
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param data Create new Adress
   */
  async createAdress(data) {
    try {
      const connection = await this.database.getConnection();
      const newObj = await connection(this.TABLE_NAME).insert(data);
      return newObj;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a Adress by id
   * @param id
   */
  async deleteById(id: number) {
    try {
      const connection = await this.database.getConnection();
      return await connection(this.TABLE_NAME)
        .where({ id })
        .delete();
    } catch (err) {
      throw err;
    }
  }

  async updateById(id: number, data) {
    try {
      const connection = await this.database.getConnection();
      return await connection(this.TABLE_NAME)
        .update(data)
        .where({ id });
    } catch (error) {
      throw error;
    }
  }
}
