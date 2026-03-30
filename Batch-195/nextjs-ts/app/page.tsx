
export default async function  Home() {
  console.log('This is the Home Page');
  //Gọi đến một api route handler để lấy dữ liệu
  const res =  await fetch('http://localhost:3000/api/v1/products')
  const products = await res.json()
  console.log('<<=== 🚀 products ===>>', products);
  //
  const res2 = await fetch('http://localhost:3000/api/v1/products/1')
  const product = await res2.json()
  console.log('<<=== 🚀 product ===>>', product);

  
  return (
    <main className="flex grow items-center justify-center p-4">
    <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </main>
  );
}
