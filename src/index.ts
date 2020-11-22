import "reflect-metadata";

import * as express from 'express';

import UserController from "./controller/UserCrontroller"
import LoginController from "./controller/LoginController"
import DashController from "./controller/DashController"

import authMiddleware from './middleware/authmiddleware'

const cors = require ('cors');

const app = express();
app.use(cors())
app.use(express.json());


app.post("/user", UserController.store)

app.post("/login", LoginController.login, (req,res) => {
})

app.post("/create", authMiddleware, (req,res)=>{
     res.redirect("/dash")
})

app.get("/dash", DashController.dash)

app.listen(3333)



// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
