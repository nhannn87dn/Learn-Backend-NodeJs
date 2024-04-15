import "@/styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <DefaultLayout>
          <Component {...pageProps} />
      </DefaultLayout>
    </div>
  )
}
