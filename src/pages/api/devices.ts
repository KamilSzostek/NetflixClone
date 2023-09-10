import { NextApiRequest, NextApiResponse } from "next";
import { connectDataBase } from "@/helpers/dbConnection";

export default async function handler(req: NextApiRequest, res:NextApiResponse){
    const client = await connectDataBase(res)
    const db = client?.db()
    if(req.method === 'GET'){
        try{
            const data = await db?.collection('Devices').find().toArray();
            res.status(200).json(data)
        }
        catch(err){
            res.status(422).json({message: err})
        }
    }
}