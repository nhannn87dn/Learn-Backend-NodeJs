import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { env } from "../constants/getEnvs";
import { ICategory } from "../types/categories";
import { Link } from "react-router";

export default function CategoriesTree() {
    const fetchCategories = async () => {
        const response = await axios.get(`${env.API_URL}/v1/categories/public/getCategories`);
        return response.data.data;
    }
    const queryCategories = useQuery<ICategory[]>({
        queryKey: ['categories-tree'],
        queryFn: fetchCategories
    });

    if (queryCategories.isLoading) return <div>Loading...</div>;
    if (!queryCategories.data) return null;

    return (
        <ul className="list-none p-0">
            {
                queryCategories.data.length > 0 && queryCategories.data.map(category => (
                    <li key={category._id} className="my-2">
                        <Link to={`/categories/${category.slug}`} className="text-blue-500 font-bold hover:underline">{category.category_name}</Link>
                    </li>
                ))
            }
        </ul>
    )
}
