import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt', maxAge: 1 * 24 * 60 * 60 },
    // debug: process.env.NODE_ENV === "development",
    pages: {
        signIn: '/login',
        signOut: '/login',
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                //check existing email & password
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter an email and password!')
                }

                //check existing user
                const existingUser = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })
                if (existingUser.active === false) {
                    throw new Error('Please visit your email to activation your account!')
                }
                if (!existingUser || !existingUser.password) throw new Error('No user found')

                //compare password
                const passwordMatch = await compare(credentials.password, existingUser.password)
                if (!passwordMatch) throw new Error('Incorrect password')

                return {
                    id: `${existingUser.id}`,
                    username: existingUser.username,
                    email: existingUser.email,
                    active: true
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email }
                })
                if (!existingUser) {
                    await prisma.user.create({
                        data: {
                            email: user.email as string,
                            name: user.name as string,
                            username: user.username as string,
                        }
                    })
                }
                return {
                    ...token,
                    username: user.username
                }
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username
                }
            }
        },
        async redirect({ baseUrl }) {
            return baseUrl
        }
    }
}