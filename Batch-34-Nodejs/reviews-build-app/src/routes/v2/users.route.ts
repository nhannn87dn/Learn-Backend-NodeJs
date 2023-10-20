import express, {Express, Request, Response} from 'express';

const router  = express.Router(); //NOT: express()

const users = [
  {id: 1, name: 'jonh'},
  {id: 2, name: 'David'}
];

//Get ALLs
router.get('/', (req: Request, res: Response) => {
  res.status(200).json(users);
});

//get user by id
router.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id;

  const user = users.find(user=>user.id === parseInt(id));
  res.status(200).json(user);
});
//create a new users
router.post('/', (req: Request, res: Response) => {
  const payload = req.body;
  console.log('create',req.body);
  res.status(200).json({msg: 'ok',payload});
});


//xuất ra
export default router;