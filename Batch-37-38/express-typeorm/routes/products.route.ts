import express, {Request, Response} from 'express'
const router = express();

router.get('', (req: Request, res: Response)=>{
    res.json({message: 'Hello'})
})

export default router