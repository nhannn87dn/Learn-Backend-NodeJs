import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog desc",
};

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 60, tags: ['posts'] },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface BlogType {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export default async function Blog() {
  const data: BlogType[] = await getData();
  return (
    <>
      <h1>Blog Page</h1>
      <ul>
        {data.map((item) => {
          return (
            <li key={item.id}>
              <Link href={`/blog/${item.id}`}>
                {item.id} - {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
