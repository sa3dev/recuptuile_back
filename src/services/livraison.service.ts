import config from "../config"
import Database from '../lib/database/index';

export default class LivraisonService {
    private TABLE_NAME: string = config.tables.livraison;
    private TABLE_NAME_PASSAGE: string = config.tables.passage

    constructor(private database: Database) { }

    /**
     * GET ALL PASSAGE
     */
    async getAllLivraison() {
        try {
            const connection = await this.database.getConnection();
            const tableData = await connection(this.TABLE_NAME);
            return (tableData);

        } catch (error) {
            throw error;
        }
    }

    async getAllLivraisonById(id: number) {
        try {
            const connection = await this.database.getConnection();
            const rows = await connection(this.TABLE_NAME)
                .innerJoin(this.TABLE_NAME_PASSAGE, 'passage.id', '=', 'livraison.passage_id')
            .where( 'livraison.user_id' , id)

            return rows;

            // SELECT * FROM `livraison` 
            // INNER JOIN passage on passage.id = livraison.passage_id 
            // where livraison.user_id = 2



        } catch (error) {
            throw error;
        }
    }

}