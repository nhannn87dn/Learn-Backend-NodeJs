import * as express from "express"
import { Request, Response } from "express"
import { User } from "./entities/user.entity"
import {My} from "./entities/my.entity"
import { myDataSource } from "./data-soucre"
import * as bodyParser from "body-parser"
// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// create and setup express app
const app = express()
app.use(bodyParser.json())
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.get("/demo", async function (req: Request, res: Response) {
    const result = await myDataSource.getRepository(My).find()
    res.json(result)
})

// register routes
app.get("/users", async function (req: Request, res: Response) {
    const users = await myDataSource.getRepository(User).find({
        relations: {
            profile: true
        }
    })
    res.json(users)
})

app.get("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).findOneBy({
        id: parseInt(req.params.id),
    })
    return res.send(results)
})

app.post("/users", async function (req: Request, res: Response) {
    console.log('create',req.body);
    const user = await myDataSource.getRepository(User).create(req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.put("/users/:id", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).findOneBy({
        id: parseInt(req.params.id),
    })
    myDataSource.getRepository(User).merge(user, req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).delete(req.params.id)
    return res.send(results)
})

// start express server
app.listen(3000, ()=> {
  console.log('Connect server successful');
})