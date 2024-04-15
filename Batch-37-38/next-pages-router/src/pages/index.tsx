import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <h1>Home Page</h1>
    <Image 
    src={'/thumbnail.jpg'} 
    alt="'thumbnail"
    width={600}
    height={475}
     />
    </>
  );
}
