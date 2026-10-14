import { BaseLayout } from "@/components/layouts/base-layout";
import { ENV } from "@/config/env";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        const fetchCategories = async()=>{
            const response = await fetch(`${ENV.API_URL}/v1/categories`);
            const data = await response.json();
            setCategories(data);
        }
        fetchCategories();
    }, []);

    console.log('<<=== 🚀 categories ===>>',categories);

    return (
        <BaseLayout 
        title="Categories" 
        description="Manage your categories and their properties"
        >
            <h1>Categories Page</h1>
        </BaseLayout>
    )
}