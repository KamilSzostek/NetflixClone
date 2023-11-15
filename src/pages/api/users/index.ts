import type { NextApiRequest, NextApiResponse } from "next";
import { connectDataBase } from "@/helpers/dbConnection";
import { encrypt } from "@/helpers/dataEncryption";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  const client = await connectDataBase(res);
  const db = client?.db();
  const {
    email,
    plan,
    password,
    phoneNumber,
    creditCard,
    isMembershipPaid,
    profiles,
    isActive,
  } = body;
  if (method === "GET") {
    try {
      let users = await db?.collection("NetflixUsers").find().toArray()
      users = users?.map(user => ({
        _id: user._id,
        email: user.email,
        plan: user.plan,
        profiles: user.profiles
      }));
      client?.close;
      return res.status(200).json(users);
    } catch (error) {
      return res.status(422).json({ message: "Unproccesable request" });
    }
  } else if (method === "POST") {
    try {
      body.password = encrypt(body.password)
        await db!.collection("NetflixUsers").insertOne(body);
        return res.status(201).json({ message: "User added", user: req.body });
    } catch (error) {
      return res.status(422).json({ message: "Something went wrong"});
    }
  } else if (method === "PUT") {
    try {
      let updatedUser;
      if (isMembershipPaid) {
        updatedUser = await db!
          .collection("NetflixUsers")
          .findOneAndUpdate(
            { email: email },
            { $set: { isMembershipPaid: isMembershipPaid } }
          );
      }
      if (plan) {
        updatedUser = await db!
          .collection("NetflixUsers")
          .findOneAndUpdate({ email: email }, { $set: { plan: plan } });
      }
      if (phoneNumber) {
        updatedUser = await db!
          .collection("NetflixUsers")
          .findOneAndUpdate(
            { email: email },
            { $set: { phoneNumber: phoneNumber } }
          );
      }
      if (password) {
        updatedUser = await db!
          .collection("NetflixUsers")
          .findOneAndUpdate({ email: email }, { $set: { password: encrypt(password) } });
      }
      if (creditCard) {
        updatedUser = await db!
          .collection("NetflixUsers")
          .findOneAndUpdate(
            { email: email },
            { $set: { creditCard: creditCard } }
          );
      }
      if (profiles) {
        updatedUser = await db!
          .collection("NetflixUsers")
          .findOneAndUpdate({ email: email }, { $set: { profiles: profiles } });
      }
      if (isActive) {
        updatedUser = await db!
          .collection("NetflixUsers")
          .findOneAndUpdate({ email: email }, { $set: { isActive: isActive } });
      }
      res
        .status(202)
        .json({ message: "User updated", user:{
          isMembershipPaid,
          hash: updatedUser?.value?.password
        }});
      client?.close;
    } catch (error) {
      return res.status(422).json({ message: "User profile didn't updated" });
    }
  }
  return res.status(404).send("Not found");
}
