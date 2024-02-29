// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: number;
  name: string;
  email: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {

  //get ALl Users
  if(req.method === 'GET') {
    res.status(200).json([
      {id: 1, name: 'Join', email: 'john@gmail.com'},
      {id: 2, name: 'Doe', email: 'doe@gmail.com'},
    ])
  }
 

  
}

//api/users