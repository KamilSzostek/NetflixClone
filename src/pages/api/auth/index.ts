import { connectDataBase } from "@/helpers/dbConnection";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const client = await connectDataBase(res);
    const db = client?.db();
    try {
      const user = await db?.collection("NetflixUsers").findOne({email: email})
      if (user && user.password === password)
        return res.status(201).json({ message: "Correct credentials data", user });
      else return res.status(401).json({ message: "Wrong credentials"});
    } catch (err) {
      console.error(err);
    }
    finally{
        client &&  client.close() ;
    }
  }
}
