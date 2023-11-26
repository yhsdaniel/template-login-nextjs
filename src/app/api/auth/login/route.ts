import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";
import { hash } from 'bcrypt'

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { email, password } = body
    try {
        const hashed_password = await hash(password, 10)
        const loginrUser = await prisma.user.findUnique({
            where: {
                email: email,
                password: hashed_password,
                active: true
            }
        })
        return NextResponse.json(loginrUser)
    } catch (error: any) {
        return NextResponse.json({user: null, message: 'Email and password invalid!'}, {status: 401})
    }
}