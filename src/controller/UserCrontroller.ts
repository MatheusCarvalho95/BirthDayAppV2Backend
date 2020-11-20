import {Request, Response} from 'express';
import * as bcrypt from "bcrypt"
import {getRepository,createConnection} from 'typeorm';

import {User} from '../entity/User';


async function HashPassword(pass) {
   const hashedpass = await bcrypt.hashSync(pass, 8);
   return hashedpass
}


class UserController {
    async store (req:Request, res: Response){
        await createConnection()
        const repository = getRepository(User);
        const {username, email, plainpassword } = req.body;
        
        const userExists = await repository.findOne({where: {email}})
        if (userExists) {
            return res.sendStatus(409)
        }
       const password = await HashPassword(plainpassword);
        const user = repository.create({username,email,password});

        await repository.save(user)

        return res.json(user)
    }


}
export default new UserController()