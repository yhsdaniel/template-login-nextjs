import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

async function AdminPage() {
  const session = await getServerSession(authOptions)

  if(session?.user){
    return <h1 className='text-2xl'>Admin Page - Welcome to Admin <b>{session?.user.username || session?.user.name}</b></h1>
  }

  return <h1 className='text-2xl'>Please login to see this admin page</h1>
}

export default AdminPage
