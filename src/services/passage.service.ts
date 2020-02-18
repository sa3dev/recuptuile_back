import config from "../config"
import Database from '../lib/database/index';
import { PassageModel } from '../models/passage.model';


export default class PassageService {
    private TABLE_NAME: string = config.tables.passage;

    constructor(private database: Database) {}

    async getAllPassage() {
        try {
            const connection = await this.database.getConnection();
            const tableData = await connection(this.TABLE_NAME);
            return tableData.map(item => new PassageModel(item).toJSON());
           
        } catch (error) {
            throw error;
        }
    }
}