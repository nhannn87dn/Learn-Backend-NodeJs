import { Metadata } from 'next'
import ClientComponentExample from './ui/ClientComponentExample'
 
export const metadata: Metadata = {
  title: 'HOme Page',
}

export default function Home() {
  return (
    <main className="">
      <h1>Home Page</h1>
      <ClientComponentExample />
    </main>
  )
}
