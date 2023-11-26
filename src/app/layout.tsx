import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat, Baumans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Provider from '@/components/Provider'

const inter = Montserrat({ subsets: ['latin'] })
const baumans = Baumans({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Tokopaedi',
  description: 'Website form practice',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          <main className='flex flex-col justify-start items-center bg-white'>
            {children}
          </main>
        </Provider>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </body>
    </html>
  )
}
