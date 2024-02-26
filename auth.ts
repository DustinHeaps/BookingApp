import NextAuth from "next-auth";
import { connectToDatabase } from "./lib/mongoose";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "./models/user";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
       
      },
      async authorize(credentials: any) {
        connectToDatabase();
        const { email, password } = credentials;
     
        let user = await User.findOne({
          email,
        });

        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
         
          if (!isMatch) {
            throw new Error("Invalid credentials");
          }
        } else {
          user = new User(credentials);
          await user.save();
        }
        return user;
      },
    }),
  ],

  callbacks: {
    async session({ token, session, user }) {
      if (token.sub) {
        session.user.id = token.sub;
      }


      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      // const existingUser = await getUserById(token.sub);
      // if (!existingUser) return token;
      return token;
    },
  },

  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
});
