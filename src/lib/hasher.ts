import * as bcrypt from 'bcryptjs';

const bcryptHasher =  { 

    async hashPassword( password ) {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password, salt)
    },
    async verifyPassword( userPass,  hash) { 
        return new Promise((resolve, error) => {
            bcrypt.compare(userPass, hash, (err, success) => {
                if (err) { 
                    return error(err) 
                }
                resolve(success)
            })
        })
    }
}

export default bcryptHasher;