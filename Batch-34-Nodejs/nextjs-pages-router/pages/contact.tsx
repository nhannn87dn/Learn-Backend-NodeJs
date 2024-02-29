import DefaultLayout from "@/components/layouts/DefaultLayout"
import { useRouter } from "next/router"

export default function Contact() {

  const router = useRouter();
  
  return <DefaultLayout>
    <h1>Contact Page</h1>

    <button onClick={() => router.push('/')}>
      Click here to read more
    </button>

  </DefaultLayout>
}