'use client'

import { ChangeEvent, useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import GoogleButton from "@/components/GoogleButton"
import toast from "react-hot-toast"

export default function LoginForm() {
    const [login, setLogin] = useState({
        name: "",
        email: "",
        password: ""
    })
    // const router = useRouter()

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        try {
            const signInData = await signIn('credentials', {
                name: login.name,
                email: login.email,
                password: login.password,
                redirect: false,
            })
            if (signInData?.ok) {
                toast.success('Logged in successfully!')
                // router.refresh()
                // router.push('/admin')
            } else {
                toast.error('Email and password invalid!')
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="flex-col flex border border-solid rounded border-gray p-10 bg-white w-[368px] shadow-md">
                <div className="flex justify-between items-center mt-7">
                    <span className="text-3xl font-bold text-gray-600">Login</span>
                    <Link href='/register' className="text-sm text-blue-500">Register</Link>
                </div>
                <form onSubmit={onSubmit} autoComplete="off" className="mt-10">
                    <div className='mb-4'>
                        <Label className="text-gray-500 font-bold">Email</Label><br />
                        <Input
                            required
                            type='text'
                            name='email'
                            autoComplete="off"
                            className="rounded border-gray-300 h-9"
                            value={login.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-6'>
                        <Label className="text-gray-500 font-bold">Password</Label><br />
                        <Input
                            required
                            type='password'
                            name='password'
                            autoComplete="off"
                            className="rounded border-gray-300 h-9"
                            value={login.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type='submit' className='w-full border rounded-[8px] px-4 py-2 bg-blue-400 hover:bg-blue-500 duration-150 ease-in-out text-white font-bold'>Login</button>
                </form>
                <div className="flex justify-center items-center mt-6">
                    <span className="border border-gray-300 w-2/6 inline-block"></span>
                    <span className="text-xs text-gray-500 px-2">or login with</span>
                    <span className="border border-gray-300 w-2/6 inline-block"></span>
                </div>
                <GoogleButton />
            </div>
        </>
    )
}
