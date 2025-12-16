export const getPosts = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BLOG_URL_API}/posts`)
    const data = await res.json()
    return data
}