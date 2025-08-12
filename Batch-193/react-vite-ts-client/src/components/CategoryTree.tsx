import { getCategoryTree } from '@/services/categoryService'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'

const CategoryTree = () => {
  const queryCategories = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoryTree
  })

  if (queryCategories.isLoading) {
    return <div className="flex justify-center items-center py-8"><span className="animate-pulse text-gray-500">Đang tải...</span></div>
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <ul className="space-y-2">
        {queryCategories.data?.map(category => (
          <li
            key={category._id}
            className="px-4 py-2 rounded hover:bg-blue-50 cursor-pointer transition flex items-center gap-2 text-gray-700"
          >
            <Link to={`/category/${category.slug}`} className="font-medium">{category.category_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryTree