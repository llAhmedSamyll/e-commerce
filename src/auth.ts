import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const authOption: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Conrent-Type": "application.json" },
        });
        const payload = await response.json();
        console.log(payload);
        return null
      },
    }),
  ],
}; 
