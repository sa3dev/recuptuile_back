import * as jwt from "jsonwebtoken";
import UsersService from "../services/users.service";

export interface AuthUser {
    id: number;
    email: string;
    role: Role;
}

export enum Role {
    user = "user",
    admin = "admin"
}

export interface Authenticator {
    validate(token: string): Promise<AuthUser>;
    authenticate(user: any): string; // Bad -> normally UserModel
}

export class JWTAuthenticator implements Authenticator {
    private secret: string = process.env.SECRET_KEY;

    constructor( private userService: UsersService) {
    }

    public async validate(token: string): Promise<AuthUser> {
        console.log('On validate Token from authenticztion ' + token);
        
        try {
        const decode: any = jwt.verify(token, this.secret);
        const user = await this.userService.findbyEmail(decode.email);

            return {
                id: user.id,
                email: user.email,
                role: user.role as Role
            };
        } catch (err) {
            throw (err);
        }
    }

    public async onUserInfo(token: string) {
        try {
            if (token &&  token.length > 0 ) {
                const decode = jwt.verify( token , this.secret);
                console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
                console.log(decode);               
                console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');


                const user = await this.userService.findbyEmail(decode.email);             

                console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
                console.log(user);
                console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");

                return {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    role: user.type,
                    phonenumber: user.phonenumber
                }
            }
        } catch (error) {
            throw error
        }
    }

    public authenticate(user: any): string {
        
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.type },
          this.secret,
          { expiresIn: 60 * 60 }
        );
        
        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        // console.log(token);     
        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

        return token
    }
}

