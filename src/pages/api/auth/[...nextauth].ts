import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let client;
        try {
          client = await MongoClient.connect(process.env.MONGODB_URL!);
          const db = client.db();
          const user = await db.collection("NetflixUsers").findOne({
            email: credentials?.email,
            password: credentials?.password,
          });
          if (user) return user.email;
          else return null;
        } catch (err) {
          console.error("Błąd autentykacji:", err);
          throw new Error("Błąd autentykacji");
        } finally {
          client?.close();
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
