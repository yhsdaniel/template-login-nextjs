import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
    const token = await getToken({req})
    const isAuthenticated = !!token
    
    console.log('token', token)
    console.log('isAuthenticated', isAuthenticated)

    if(isAuthenticated && req.nextUrl.pathname.startsWith('/login')){
        return NextResponse.redirect(new URL('/admin', req.url))
    }
}

export const config = {
    matcher: ['/admin'],
}