import NextAuth from "next-auth";
// import AppleProvider from "next-auth/providers/apple";
// import FacebookProvider from "next-auth/providers/facebook";
// import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/models/User";
import Payment from "@/models/Payment";
import { connectToDatabase } from "@/lib/mongodb";

// export async function GET(request) {}

// export async function HEAD(request) {}

// export async function POST(request) {}

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "NextAuth.js <no-reply@example.com>",
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        if (account.provider === "github") {
          await connectToDatabase(); // Ensure database connection

          const currentUser = await User.findOne({ email: user.email });
          if (!currentUser) {
            const newUser = new User({
              name: user.name,
              email: user.email,

              username: user.email.split("@")[0],
            });
            await newUser.save();
            user.name = newUser.username;
          } else {
            user.name = currentUser.username;
          }
        }
        return true;
      } catch (error) {
        console.error("kyu yrrr Error in sign-in callback:", error);
        return false;
      }
    },
  },
});

export { authoptions as GET, authoptions as POST };
