import Link from "next/link";

export default async function Home() {
  return (
    <>
      <h1 className="text-2xl">Home</h1>
      <Link className='border border-gray-600 rounded px-4 py-2 bg-gray-700 text-gray-300 hover:text-white' href='/admin'>Open My Admin</Link>
    </>
  )
}
