import { useParams } from "react-router";

const CategoryPage = () => {
    const { slug } = useParams<{ slug: string }>();
    console.log('<<=== 🚀  ===>>', slug);

    //TODO: Get 20 products by category slug from API and display them here
  return (
    <div>CategoryPage - {slug}</div>
  )
}

export default CategoryPage