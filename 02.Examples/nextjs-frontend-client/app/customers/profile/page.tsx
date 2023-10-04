import type { Metadata } from 'next'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'Customer Profile',
  description: 'Customer desc'
}


export default async function Page() {

  const session = await getServerSession(authOptions);
  const user = session?.user;

    return (
      <>
      <h1>Customer Profile Page</h1>
      {!user ? (
              <p>Loading...</p>
            ) : (
              <div className="flex items-center gap-8">
                <div className="mt-8">
                  <p className="mb-3">Name: {user.name}</p>
                  <p className="mb-3">Email: {user.email}</p>
                </div>
              </div>
            )}
      </>
    )
  }