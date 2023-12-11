'use client'

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"

const SignOut = () => {
  return (
    <Button onClick={() => signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/login`
    })} className="border border-gray-600 rounded px-4 py-2 duration-150 ease-in bg-red-500 text-gray-300 hover:bg-red-600 hover:text-gray-500">Logout</Button>
  )
}

export default SignOut
