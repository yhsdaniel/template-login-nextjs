import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";
import { hash } from 'bcrypt'
import { sendConfirmationEmail } from "./mailer";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { name, username, email, password } = body;
    try {
        //check if email already exists
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email: email }
        })
        if(existingUserByEmail){
            return NextResponse.json({user: null, message: 'Username and email already exists'}, {status: 401})
        }
        
        const hashes_password = await hash(password, 10)
        const registerUser = await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashes_password,
            }
        })
        const { password: newUserPassword, ...rest } = registerUser
        sendConfirmationEmail({ toUser: registerUser.name, hash: registerUser.id })
        return NextResponse.json({ user: rest, message: 'User registration successful'}, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ message: 'User registration failed'}, { status: 500 })
    }
}