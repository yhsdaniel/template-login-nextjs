'use client'

import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";

export default function ActivationPage({ params }: { params: { slug: string } }) {
    const uid = params.slug

    useEffect(() => {
        if(uid){
            axios.post('/api/auth/activate', { id: uid }).then((response) => console.log(response))
        }
    }, [uid])

    return (
        <div className='h-full w-2/3 relative my-8 flex justify-center items-start flex-col'>
            <h1 className="text-3xl font-bold">User Activation</h1>
            <div className="bg-green-200 mt-3 p-6 w-full">You have been successfully activated. You can login now! <Link href={'/login'} className="text-blue-500">Login</Link></div>
        </div>
    )
}
