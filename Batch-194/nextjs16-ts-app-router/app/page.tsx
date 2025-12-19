import { Metadata } from 'next';
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Home Page",
  description: "Home page descriptions",
};


export default function Home() {
  return (
    <>
    <h1>Hello NextJs  </h1>
    <h2>Local image</h2>
    <Image preload={true} width={50} height={50} src="/images/icon-05.png" alt="" />
    <h2>Remote image</h2>
    <Image preload={true} width={160} height={160} src="https://cdn.tgdd.vn/2025/12/timerseo/331204.jpg" alt="" />
    </>
  );
}
