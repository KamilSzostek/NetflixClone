import { MongoClient } from "mongodb";
import { NextApiResponse } from "next";

export async function connectDataBase(res: NextApiResponse) {
  try{
    const client = await MongoClient.connect(`${process.env.MONGODB_CONNECTION_STRING}`);
    return client;
  }
  catch(err){
    res.status(500).json('No connection with database')
  }
}