// import type { Metadata, ResolvingMetadata } from "next";

type PageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

interface BlogType {
  id: number;
  userId: number;
  title: string;
  body: string;
}


/**
 * Fetching Data on the Server 
 * @param id number
 * @returns object[]
 */
async function getData(id: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

/**
 * generateMetadata
 * Sinh ra title động cho route khi id thay đổi
 */
export async function generateMetadata({ params, searchParams }: PageProps) {
  // read route params
  const id = parseInt (params.id);

  // fetch data
  const post = await getData(id);

  return {
    title: post.title,
  };
}


/**
 * Hiển thị UI cho route
 */
export default async function Page({ params, searchParams }: PageProps) {
  const id = parseInt (params.id);
  const post = await getData(id);

  return <div>My Post: {post.title}</div>;
}

/**
 * Tạo ra danh sách đường dẫn động /blog/:id
 * @returns object[]
 */
export async function generateStaticParams() {
  const posts: BlogType[] = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((res) => res.json());

  //Cắt ra chỉ build 10 link bài viết
  const newPost = posts.slice(0, 10);

  return newPost.map((post) => ({
    id: post.id.toString(),
  }));
}
