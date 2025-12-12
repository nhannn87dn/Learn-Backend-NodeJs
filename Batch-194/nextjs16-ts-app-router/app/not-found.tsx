import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className='container mx-auto my-5'>
      <div className="flex flex-col  justify-center  ">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </main>
  )
}