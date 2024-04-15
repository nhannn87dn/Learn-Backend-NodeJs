/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    /**
     * Cấu hình domain cho các tài nguyên tĩnh
     * từ nguồn bên ngoài
     */
    domains: ['i.imgur.com', 'img.freepik.com', 'placeimg.com'],
},
};

export default nextConfig;
