'use client'

import axios from 'axios'
import React, { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function RegisterForm() {
    const [register, setRegister] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })
    const router = useRouter()

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/auth/register', {
                name: register.name,
                username: register.username,
                email: register.email,
                password: register.password,
            })
            setRegister({ name: '', username: '', email: '', password: '' })
            toast.success('Please visit your email address and active your account', {
                duration: 10000
            })
        } catch (error: any) {
            toast.error('Username and email already exists')
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRegister({ ...register, [e.target.name]: e.target.value })
    }
    return (
        <div className='w-[400px] ml-12 max-md:ml-0 pt-6 pb-8 pr-10 pl-10 border rounded-lg shadow-lg'>
            <div className='my-7'>
                <p className='text-2xl font-bold text-gray-600 text-center'>Register Now</p>
                <p className='text-center'>
                    <span className='text-sm pr-1'>Already have tokopaedi account?</span>
                    <Link href={'/login'} className='text-blue-600'>Login</Link>
                </p>
            </div>
            <form onSubmit={onSubmit}>
                <div className='mb-4'>
                    <Label className='text-gray-500 font-bold'>Name</Label>
                    <Input
                        required
                        type='text'
                        name='name'
                        className="rounded border-gray-300 h-9"
                        value={register.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-4'>
                    <Label className='text-gray-500 font-bold'>Username</Label>
                    <Input
                        required
                        type='text'
                        name='username'
                        className="rounded border-gray-300 h-9"
                        value={register.username}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-4'>
                    <Label className='text-gray-500 font-bold'>Email</Label>
                    <Input
                        required
                        type='email'
                        name='email'
                        className="rounded border-gray-300 h-9"
                        value={register.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-4'>
                    <Label className='text-gray-500 font-bold'>Password</Label>
                    <Input
                        required
                        type='password'
                        name='password'
                        className="rounded border-gray-300 h-9"
                        value={register.password}
                        onChange={handleChange}
                    />
                </div>
                <button type='submit' className='w-full rounded px-4 py-2 mt-4 bg-blue-400 text-white font-bold hover:bg-blue-500 duration-75 ease-in'>
                    Submit
                </button>
            </form>
        </div>
    )
}
