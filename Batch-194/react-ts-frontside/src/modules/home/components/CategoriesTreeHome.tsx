import { useQuery } from "@tanstack/react-query"
import { getCategoriesTree } from "../home.service"
import { Link } from "react-router";

const CategoriesTreeHome = () => {
    const queryTree = useQuery({
        queryKey: ['categories-tree-home'],
        queryFn: getCategoriesTree
    })

    console.log('<<=== 🚀 queryTree.data ===>>',queryTree.data);

  return (
    <aside className="categories-tree w-[220px]">
        <ul>
            {queryTree.data?.data?.map((category) => (
                <li key={category._id} className="mb-2">
                    <Link to={`/categories/${category.slug}`}><span className="font-semibold">{category.category_name}</span></Link>
                </li>
            ))}
        </ul>
    </aside>
  )
}

export default CategoriesTreeHome