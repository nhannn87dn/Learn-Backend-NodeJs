import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'About',
  description: 'About desc'
}


export default function About() {
    return <h1>About Page</h1>
  }