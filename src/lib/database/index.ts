import Knex from 'knex';
import path from 'path';

interface IDatabaseParams {
    type: string;
    host: string;
    port: number;
    password: string;
    user: string;
    name: string;
    debug: boolean;
}

export default class Database {
    
    private config: IDatabaseParams;
    private connection: Knex;

    private initConnection(params: IDatabaseParams) {
        this.connection = Knex({
            client: params.type, 
            debug: params.debug,
            connection: {
                port: params.port,
                host: params.host,
                user: params.user,
                password: params.password,
                database: params.name,
                debug: params.debug
            } 
        });
    }

    constructor(params: IDatabaseParams) {
        this.config = params;
        this.initConnection(params);
    }

    public schemaMigration(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await this.getConnection();
                await connection.migrate.latest({
                    tableName: "migrations",
                    directory: path.resolve(__dirname, './migrations')
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    async getConnection(): Promise<Knex> {
        if (!this.connection) {
            this.initConnection(this.config);
        }
        return this.connection;
    }

    async destroyConnection(): Promise<void> {
        if (this.connection) {
            await this.connection.destroy();
            this.connection = null;
        }
    }
}