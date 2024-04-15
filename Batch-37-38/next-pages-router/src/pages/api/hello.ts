// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      //some code...
      //res.status(200).json({})
      break;

    case 'POST':
      //some code...
      //res.status(201).json({//response object})
      break;

    case 'PUT':
      //some code...
      //res.status(200).json({//response object})
      break;
    case 'DELETE':
        //some code...
        //res.status(200).json({//response object})
        break;

    default:
      //res.status(405).end(`${method} Not Allowed`);
      break;
  }

  res.status(200).json({ name: "John Doe" });
}
