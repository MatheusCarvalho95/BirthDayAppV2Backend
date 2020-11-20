const jwt = require("jsonwebtoken")

import {getRepository,createConnection} from "typeorm";

import {User} from "../entity/User"
import {Birthday} from "../entity/Birthdays";


const auth = async (req,res,next) => {
    
    let authHeader = req.headers.authorization;
    if(!authHeader)
       return res.status(401).send({error: "No token provided"});

     const parts = authHeader.split(' ');

     const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({error:'Token malformated'});

    jwt.verify(token, 'secretsuposedtobeonDOTENV', async (err, decoded) =>{
        if(err) return res.status(401).send({error: "token invalid"});

        req.userId = decoded.id;
        
        await createConnection()
        const user = await getRepository(User).createQueryBuilder("user").where("user.id =:id", {id: req.userId}).getOne();
        
        const {name, date, where, gifts} = req.body;
        
        const birthdaysTable = getRepository(Birthday)
        
        const birthday = new Birthday();
        birthday.name = name;
        birthday.date = date;
        birthday.where = where;
        birthday.gifts = gifts;
        birthday.user = user;

        
        await birthdaysTable.save(birthday)
       
        return next()
    })
};

export default auth