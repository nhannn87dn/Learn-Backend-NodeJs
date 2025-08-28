'use client'

import { Category } from "@/types/category.type";
import { useEffect, useState } from "react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`https://learn-backend-nodejs.onrender.com/api/v1/categories`);
      const data = await response.json();
      setCategories(data.data.data);
    };
    fetchCategories();
  }, []);
  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <h2>{category.category_name}</h2>
            <p>{category.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPage