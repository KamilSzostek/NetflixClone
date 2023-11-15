import { connectDataBase } from "@/helpers/dbConnection";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await connectDataBase(res);
  const db = client?.db();
  if (req.method === "GET") {
    try {
        const user = await db?.collection('NetflixUsers').findOne({email: req.query.email})
        user ? res.status(200).json({
            id: user._id,
            email: user.email,
            plan: user.plan,
            profiles: user.profiles,
            isMembershipPaid: user.isMembershipPaid,
            isActive: user.isActive
        })
        : res.status(400).json({message: 'User not found'})
    } catch (err) {
      res.status(401).json({ message: err });
    }
  }
}
