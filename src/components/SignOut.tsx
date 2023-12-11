'use client'

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"

const SignOut = () => {
  return (
    <Button onClick={() => signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/login`
    })} className="rounded px-4 py-1 duration-150 ease-in bg-red-400 hover:bg-red-500 text-white">Logout</Button>
  )
}

export default SignOut
