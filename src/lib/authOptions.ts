import { AuthService } from "@/app/api/v1/auth/auth.service";
import { ACCESS_TOKEN_KEY } from "@/constants/common";
import { setToCookie } from "@/helpers/cookieHelper";
import { jwtHelpers } from "@/helpers/jwtHelper";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "my-app-credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        phoneNumber: {
          label: "Phone Number",
          type: "text",
          placeholder: "phone number",
        },
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const { email, password } = credentials as any;
        // const result = await login({
        //   email: credentials?.email,
        //   password: credentials?.password,
        // });

        const result = await AuthService.loginUser({
          email,
          // phoneNumber,
          password,
        }) as any;
        // console.log(result);

        // const data = result?.data;

        // const message = (result as any)?.message;

        const verifiedToken: any = jwtHelpers.verifyToken(
          result?.accessToken,
          process.env.JWT_SECRET!
        );
        // const { data, message } = await res.json();

        if (result) {
          // Any object returned will be saved in `user` property of the JWT

          setToCookie(ACCESS_TOKEN_KEY, result?.accessToken);
          return { ...result, ...verifiedToken };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error("Invalid credentials");
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // console.log(token, "token auth option")
      // console.log(user, "user auth option")
      return {
        ...token,
        ...user,
        ...account,
      };
    },
    async session({ session, token }: { session: any; token: any }) {
      const verifiedToken = jwtHelpers.verifyToken(
        token?.accessToken,
        process.env.JWT_SECRET!
      );

      // if (!verifiedToken) {
      //   const { data }: Record<string, any> = await getNewAccessToken(
      //     token?.accessToken
      //   );

      //   console.log("New token generated", data);
      //   token.accessToken = data?.accessToken;
      // }

      // setToCookie(ACCESS_TOKEN_KEY, token?.accessToken);
      return {
        ...session,
        ...token,
      };
    },

  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/login",
    error: "/",
  },
};
