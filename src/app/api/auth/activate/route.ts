import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
    const body = await req.json()
    const { id } = body
    try {
        const checkingUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        const updateActiveUser = await prisma.user.update({
            where: {
                id: checkingUser.id
            },
            data: {
                active: {
                    set: true
                }
            }
        })
        return NextResponse.json(updateActiveUser)
    } catch (error: any) {
        return NextResponse.json({ message: 'Invalid Login. Please activation account from your email.' }, { status: 500 })
    }
}