import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { decrypt } from "@/helpers/dataEncryption";

export const authOptions = {
  session:{
    maxAge: 7*24*60*60
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          const client = await MongoClient.connect(
            `${process.env.MONGODB_CONNECTION_STRING}`
          );
          const users = client?.db().collection("NetflixUsers");
          const result = await users.findOne({
            email: credentials.email,
            isActive: true
          });
          if (!result) {
            client.close();
            throw new Error("No user found with that email");
          }
          if (decrypt(result.password) !== credentials.password) {
            client.close();
            throw new Error("Password doesn't match.");
          }
          client.close();
          return { id: result._id.toString(), email: result.email, name:'', image:''};
        } else 
        return null
      },
    }),
  ],
}

export default NextAuth(authOptions);
