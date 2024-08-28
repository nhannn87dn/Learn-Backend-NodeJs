import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SETTINGS } from "../constants/settings";
import { Link } from "react-router-dom";

const HomePage = () => {
  const fetchCategories = async () => {
    const res = await axios.get(`${SETTINGS.URL_API}/v1/categories`);
    return res.data.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <div>
      <h1 className="text-4xl font-bold mb-5">HomePage</h1>
      {isLoading ? (
        <span>Loading....</span>
      ) : (
        <ul>
          {data &&
            data.length > 0 &&
            data.map((c) => {
              return (
                <li key={c._id}>
                  <Link to={`/category/${c.slug}`}>{c.category_name}</Link>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
