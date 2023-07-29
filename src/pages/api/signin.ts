import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { connectDataBase } from "@/helpers/dbConnection";

function checkValidation(res: NextApiResponse, valueValidated: string) {
  return res.status(422).json({
    message: `Unproccesable request, Invalid ${valueValidated}`,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recaptchaSecretKey = "6LcjA2UnAAAAANMH-hW1YEcr8nftU4X6Ro2PD-NL" as string;
  const { body, method } = req;
  const { email, password, captcha } = body;
  const client = await connectDataBase(res);
  const db = client?.db();
  if(method === 'GET'){
    const users = await db?.collection("NetflixUsers").find().toArray();
    const emailValidation = users?.find((user) => user.email === email);
    const passwordValidation = users?.find((user) => user.password === password);
    if (!emailValidation) checkValidation(res, "email");
    else if (!passwordValidation) checkValidation(res, "password");
    else return res.status(200).send("OK");
    client?.close()

  }
  if (method === "POST") {
    if (!captcha) {
      return res.status(422).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }
    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=6LcjA2UnAAAAANMH-hW1YEcr8nftU4X6Ro2PD-NL&response=${captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      const captchaValidation = await response.json();

      if (!captchaValidation) checkValidation(res, "captcha code");
      else return res.status(200).send("OK");

    } catch (error) {
      console.error(error);
      return res.status(422).json({ message: "Something went wrong" });
    }
  }
  return res.status(404).send("Not found");
}
