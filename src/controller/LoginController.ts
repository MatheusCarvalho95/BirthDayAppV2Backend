import {Request, Response, Next} from "express";
import {getRepository,createConnection, getConnectionManager} from "typeorm";

import * as bcrypt from "bcrypt";

import * as jwt from "jsonwebtoken"

import {User} from "../entity/User"

class LoginController {
    async login(req:Request, res: Response, Next: Next){
        
        const ConnectionManager = getConnectionManager()
        if(!ConnectionManager.has("default")){
            await createConnection() 
        }

       
        const repository = getRepository(User);

        const {email, password} = req.body;

        const user = await repository.findOne({where: {email}});

        if(!user){
            return res.sendStatus(401)
        };
       
        const passwordIsValid = await bcrypt.compare(password, user.password)

        if(!passwordIsValid){
            return res.senStatus(401)
        }

        const token = jwt.sign({id: user.id}, 'secretsuposedtobeonDOTENV', {expiresIn: '1d'});

        delete user.password;

        return res.json({user, token})
    }
}

export default new LoginController()