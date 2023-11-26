import User from "@/components/User";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <>
      {/* <section className="bg-ct-blue-600 min-h-screen flex">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <AdminPage />
        </div>
      </section> */}
      <h1 className="text-2xl">Home</h1>
      <Link className='border border-gray-600 rounded px-4 py-2 bg-gray-700 text-gray-300 hover:text-white' href='/admin'>Open My Admin</Link>

      <h1>Client Session</h1>
      <User />
      <h1>Server Session</h1>
      {JSON.stringify(session)}
    </>
  )
}
