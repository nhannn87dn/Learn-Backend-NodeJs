export const getCategories = async () => {
  const res = await fetch('https://api.escuelajs.co/api/v1/categories');
  const categories = await res.json();
  return categories;
}