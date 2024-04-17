import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  debug: true,
  pages: {
    signIn: "/login", //Dẫn đến trang login custom
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async(credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        console.log('<<=== 🚀 payload ===>>',payload);

        const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const tokens = await res.json();
        //Chứa access_token và fresh_token
        console.log('<<=== 🚀 tokens ===>>',tokens);

        if (!res.ok) {
          throw new Error("UnAuthorized");
        }
        // If no error and we have user data, return it
        if (res.ok && tokens) {
          const res = await fetch('https://api.escuelajs.co/api/v1/auth/profile',
          {
            headers: {
              'Authorization': `Bearer ${tokens.access_token}`,
            },
          });
          let user = await res.json();
          if (!res.ok) {
            throw new Error("UnAuthorized");
          }
          user = {...user, image: user.avatar, token: tokens.access_token, refreshToken: tokens.refresh_token};
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('callbacks jwt', token, user, account,profile,isNewUser);
      if (account && user) {
        return {
          ...token,
          //accessToken: user?.token,
          //refreshToken: user?.refreshToken,
          avatar: token.avatar
        };
      }

      return token;
    },

    async session({ session, token }) {
      //console.log('callbacks session', token);
      // if(token && session.user){
      //   session.user.accessToken = token.accessToken;
      //   session.user.refreshToken = token.refreshToken;
      //   session.user.picture = token.picture || token.avatar;
      // }
      console.log('callbacks session', session);
      return session;
    },
   
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };