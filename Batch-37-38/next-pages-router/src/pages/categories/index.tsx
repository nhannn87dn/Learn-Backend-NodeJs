import Link from "next/link"

type TCategories = {
  id: number,
  name: string
}

const CategoriesPage = ({categories}: {categories: TCategories[]}) => {
  return (
    <div>
        <ul>
          {
            categories.map((c)=>{
              return <li key={c.id}>
                  <Link href={`/categories/${c.id}`}>{c.id} - {c.name}</Link>
              </li>
            })

          }
        </ul>
    </div>
  )
}

export default CategoriesPage


/**
 * getServerSideProps
 * thì API được gọi lại khi mỗi lần có request
 * 
 */
export async function getServerSideProps() {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories`)
  const categories = await res.json()
 
  return {
    props: { 
      categories, //đưa categories vào biến props
     },
  }
}