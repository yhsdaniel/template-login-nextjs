import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import UserAccountNav from './UserAccountNav'
import logo from '../../public/images/logo.png'
import Image from 'next/image'

export default async function Navbar() {
    const session = await getServerSession(authOptions)

    return (
        <div className='bg-white py-4 w-full z-10 top-0 h-16 relative'>
            <div className='container flex items-center justify-center'>
                <div className='w-10/12 flex justify-start'>
                    <Link href={'/'} className="text-gray-500 hover:text-black">
                        {/* <Image src={logo} alt={'logo'} className='w-36' /> */}
                        <h1 className='text-4xl text-blue-500'>tokopaedi</h1>
                    </Link>
                </div>
                <div className='flex justify-center items-center flex-1'>
                    <p className='mx-8 italic'>{session?.user.name || session?.user.username}</p>
                    {!session?.user ? (
                        <Link className='rounded px-4 py-1 duration-150 ease-in bg-blue-400 hover:bg-blue-500 text-white' href='/login'>
                            Login
                        </Link>
                    ) : (
                        <UserAccountNav />
                    )}
                </div>
            </div>
        </div>
    )
}
