import type { NextApiRequest, NextApiResponse } from "next";
import { connectDataBase } from "@/helpers/dbConnection";

function checkValidation(res: NextApiResponse, valueValidated: string) {
  return res.status(422).json({
    message: `Unproccesable request, Invalid ${valueValidated}`,
  });
}
const recaptchaSecretKey = "6LcjA2UnAAAAANMH-hW1YEcr8nftU4X6Ro2PD-NL" as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  // const { captcha } = body;
  const client = await connectDataBase(res);
  const db = client?.db();
  if (method === "GET") {
    try {
      const users = await db?.collection("NetflixUsers").find().toArray();
      client?.close;
      return res.status(200).json(users);
    } catch (error) {
      return res.status(422).json({ message: "Unproccesable request" });
    }
  } else if (method === "POST") {
    // if (!captcha) {
    //   return res.status(422).json({
    //     message: "Unproccesable request, please provide the required fields",
    //   });
    // }
    try {
      // const response = await fetch(
      //   `https://www.google.com/recaptcha/api/siteverify?secret=6LcjA2UnAAAAANMH-hW1YEcr8nftU4X6Ro2PD-NL&response=${captcha}`,
      //   {
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      //     },
      //     method: "POST",
      //   }
      // );
      // const captchaValidation = await response.json();

      // if (!captchaValidation) checkValidation(res, "captcha code");
      // else return res.status(200).send("OK");

      db!.collection("NetflixUsers").insertOne(body);
      res.status(201).json({ message: "User added", user: req.body });
    } catch (error) {
      console.error(error);
      return res.status(422).json({ message: "Something went wrong" });
    }
  } else if (method === "PUT") {
    try {
      const {
        email,
        plan,
        password,
        phoneNumber,
        creditCard,
        isMembershipPaid,
        profiles,
      } = body;
      if (isMembershipPaid) {
        await db!
          .collection("NetflixUsers")
          .findOneAndUpdate(
            { email: email },
            { $set: { isMembershipPaid: isMembershipPaid } }
          );
      }
      if (plan) {
        await db!
          .collection("NetflixUsers")
          .findOneAndUpdate({ email: email }, { $set: { plan: plan } });
      }
      if (phoneNumber) {
        await db!
          .collection("NetflixUsers")
          .findOneAndUpdate(
            { email: email },
            { $set: { phoneNumber: phoneNumber } }
          );
      }
      if (password) {
        await db!
          .collection("NetflixUsers")
          .findOneAndUpdate({ email: email }, { $set: { password: password } });
      }
      if (creditCard) {
        await db!
          .collection("NetflixUsers")
          .findOneAndUpdate(
            { email: email },
            { $set: { creditCard: creditCard } }
          );
      }
      if (profiles) {
        await db!
          .collection("NetflixUsers")
          .findOneAndUpdate({ email: email }, { $set: { profiles: profiles } });
      }
      res.status(201).json({ message: "User updated", user: req.body });
      client?.close;
    } catch (error) {
      return res.status(422).json({ message: "User data didn't updated" });
    }
  }
  return res.status(404).send("Not found");
}
