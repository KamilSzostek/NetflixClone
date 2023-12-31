import { connectDataBase } from "@/helpers/dbConnection";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {method, body} = req
    if(method === 'GET'){
        try{
            const client = await connectDataBase(res)
            const db = client?.db()
            const result = await db?.collection('Languages').find().toArray();
            return  res.status(201).json(result)
        }
        catch(err){
            res.status(422).json({message: 'Something went wrong'})
        }
    }
    if(method === "POST"){
        const client = await connectDataBase(res)
        const db = client?.db()
        await db?.collection('Languages').insertOne(body)
        return  res.status(201).json(body)
    }
}