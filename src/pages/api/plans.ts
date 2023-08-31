import { NextApiRequest, NextApiResponse } from "next";
import { connectDataBase } from "@/helpers/dbConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await connectDataBase(res);
    const db = client?.db();
  if (req.method === "GET") {
    try {
      const plans = await db?.collection("MembershipPlans").find().toArray();
      client?.close;
      return res.status(200).json(plans);
    } catch (error) {
      return res.status(422).json({ message: "Unproccesable request" });
    }
  }
}
