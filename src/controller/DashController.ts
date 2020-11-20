import {Request, Response, Next} from "express";
import {getRepository, createConnection} from "typeorm";

import {User} from '../entity/User';
import {Birthday} from "../entity/Birthdays";

const jwt = require("jsonwebtoken")

class DashController {
    async dash(req: Request, res:Response) {
        let authHeader = req.headers.authorization;
        if(!authHeader)
       return res.status(401).send({error: "No token provided"});

         const parts = authHeader.split(' ');

      const [scheme, token] = parts;

      if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({error:'Token malformated'});

    jwt.verify(token, 'secretsuposedtobeonDOTENV', async (err, decoded) =>{
          if(err) return res.status(401).send({error: "token invalid"});

        const userId = decoded.id;

        await createConnection()
          

          const birthdayRepo = await getRepository(Birthday)
        
          const birthdays = await birthdayRepo.find({where: {userId:userId}})

            res.send(birthdays)
    })

    }}
export default new DashController ()