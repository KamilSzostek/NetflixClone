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
      const icons = await db?.collection("ProfileIcons").find().toArray();
      return res.status(201).json(icons);
    } catch (err) {
      return res.status(421).json({ message: "Something, went wrong." });
    }
  }
}
