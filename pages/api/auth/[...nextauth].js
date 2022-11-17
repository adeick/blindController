import NextAuth from 'next-auth'
// import OktaProvider from "next-auth/providers/okta"
import GoogleProvider from 'next-auth/providers/google'

//import { color, useColorModeValue } from '@chakra-ui/react'

export default NextAuth({
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization:
                "https://accounts.google.com/o/oauth2/auth?response_type=code&hd=iastate.edu", // hosted domain is domain.com
        }),
    ],
    theme: {
        colorScheme: "light",
    },
    callbacks: {
        async jwt({ token }) {
            token.userRole = "admin"
            return token
        },
    },
});

