
const AddBrandPage = () => {

    // Server Action
  async function createBrand(formData: FormData) {
    'use server'
    // ...
    console.log('<<=== 🚀 formData ===>>',formData);
    //gọi API để thêm mới brand
    const response = await fetch(`https://learn-backend-nodejs.onrender.com/api/v1/brands`, {
      method: 'POST',
      body: JSON.stringify({
        brand_name: formData.get('brand_name'),
        description: formData.get('description'),
        slug: formData.get('slug')
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log('<<=== 🚀 data ===>>',data);
  }
  return (
    <div>
        <h1>Add Brand Page</h1>
        <form action={createBrand}>
        <input  placeholder="Brand Name" className="px-4 py-2 border border-gray-300" type="text" name="brand_name" required />
        <input placeholder="Description" className="px-4 py-2 border border-gray-300" type="text" name="description" />
        <input placeholder="Slug" className="px-4 py-2 border border-gray-300" type="text" name="slug" required />
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">Create</button>
        </form>
    </div>
  )
}

export default AddBrandPage