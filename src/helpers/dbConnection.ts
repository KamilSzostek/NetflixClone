import { MongoClient } from "mongodb";
import { NextApiResponse } from "next";

export async function connectDataBase(res: NextApiResponse) {
  try{
    const client = await MongoClient.connect("mongodb+srv://user:kMdYJhAY4ReopkEI@events.8r7or1u.mongodb.net/?retryWrites=true&w=majority");
    return client;
  }
  catch(err){
    res.status(500).json('No connection with database')
  }
}