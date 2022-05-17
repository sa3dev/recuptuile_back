import Database from "../lib/database";
import config from "../config";

export default class UsersService {
    private TABLE_NAME: string = config.tables.users;

    constructor(private database: Database) {
    }

    async getAllUsers() {
        const connection = await this.database.getConnection();
        const rows = await connection.table(this.TABLE_NAME)

        return rows;
    }

    async findbyEmail(email: string): Promise<any> {
        const conn = await this.database.getConnection();
        const user = await conn
        .table(this.TABLE_NAME)
        .where({ email })
        .first();

        if (!user) {
            throw ("User does not exist");
        }      
        
        return {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            type: user.type,
            phonenumber: user.phonenumber,
            userpassword: user.userpassword 
        };
    }

    public async insert(user): Promise<any> {
        const conn = await this.database.getConnection();

        try {
        const result = await conn.table(this.TABLE_NAME).insert({
          full_name: user.full_name,
          email: user.email,
          userpassword: user.password,
          phonenumber: user.phonenumber ? user.phonenumber : null,
          type: user.type ? user.type : 'user'
        });

        user.id = result[0];
        return user;
        } catch (err) {
            throw (`Email  already exists` + err);
        }
    }

    public async update(userId: number , body: any): Promise<any> {
        // user.updated = new Date();

        const conn = await this.database.getConnection();

         return await conn.table(this.TABLE_NAME).update(
            body
            //  {first_name: user.firstName,
            // last_name: user.lastName,
            // password: user.password }
        ).where({id: userId});

    }

    public async changePassword( email: string, newPassword: string ): Promise<void> {
        const conn = await this.database.getConnection();

        await conn
        .table(this.TABLE_NAME)
        .update({
            userpassword: newPassword,
        })
        .where("email", email);
        
        
    }

    public async deleteById(userId: number): Promise<void> {
        const trx = await this.database.getConnection();

        try {
        // multiple delete if found in another table
        await trx
            .from("task")
            .delete()
            .where({ user_id: userId });

        await trx
            .from(this.TABLE_NAME)
            .delete()
            .where({ id: userId });

        } catch (error) {
            throw error;
        }
    }
}
