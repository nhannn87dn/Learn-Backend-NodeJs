import MyProfile from "@/components/ui/MyProfile";

export default function Home() {
  return (
    <>
    <h1>Hello NextJs </h1>
    <MyProfile />
    <h2>Chèn Local Image</h2>
    <img src="images/samsung-galaxy-a16.jpg" alt="Local Image" />
    <h2>Chèn Remote Image</h2>
    <img src="https://cdn.tgdd.vn/Products/Images/7264/242214/dong-ho-nam-mvw-ml049-01-thumb-fix-600x600.jpg" alt="Remote Image" />
    </>
  );
}
