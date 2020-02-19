import config from "../config"
import Database from '../lib/database/index';
import { PassageModel } from '../models/passage.model';


export default class PassageService {
    private TABLE_NAME: string = config.tables.passage;

    constructor(private database: Database) {}

    /**
     * GET ALL PASSAGE
     */
    async getAllPassage() {
        try {
            const connection = await this.database.getConnection();
            const tableData = await connection(this.TABLE_NAME);
            return tableData.map(item => new PassageModel(item).toJSON());
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param id GET PASSAGE BY ID
     */
    async getPassageById(id: number) {
        try {
            const connection = await this.database.getConnection();
            const tableData = await connection(this.TABLE_NAME);
            return tableData.find(element => element.id === id );
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param data Create new passage
     */
    async createPassage( data ) {        
        try {
            const connection = await this.database.getConnection();
            return await connection(this.TABLE_NAME).insert(data);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete a passage by id
     * @param id 
     */
    async deleteById(id: number) {
        try {
            const connection = await this.database.getConnection();
            return await connection(this.TABLE_NAME).where({ id }).delete();
        } catch (err) {
            throw err;
        }
    }

    async updateById( id: number , data ) {
        try {
            const connection = await this.database.getConnection();
            return await connection(this.TABLE_NAME).update(data).where({ id });
        } catch (error) {
            throw error;
        }
    }
}