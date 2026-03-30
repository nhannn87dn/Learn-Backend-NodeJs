'use client'
import { use } from 'react'

const ClientComponent = ({
  data,
}: {
  data: Promise<{ id: string; name: string }[]>
}) => {
    const allCategories = use(data)
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {allCategories.map((category: any) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default ClientComponent