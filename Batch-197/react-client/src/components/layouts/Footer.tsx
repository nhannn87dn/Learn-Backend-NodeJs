const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - Grid Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Về chúng tôi */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">ShopName</h3>
            <p className="text-sm mb-4">
              Điểm đến mua sắm trực tuyến hàng đầu dành cho bạn. Chúng tôi cam kết mang đến sản phẩm chất lượng và dịch vụ tốt nhất.
            </p>
            <ul className="text-sm space-y-2">
              <li>📞 Hotline: 1900 xxxx</li>
              <li>✉️ Email: support@shopname.com</li>
              <li>📍 Địa chỉ: 123 Đường ABC, TP.HCM</li>
            </ul>
          </div>

          {/* Column 2: Chăm sóc khách hàng */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Hỗ trợ khách hàng</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="hover:text-white transition">Hướng dẫn mua hàng</a></li>
              <li><a href="#" className="hover:text-white transition">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-white transition">Chính sách vận chuyển</a></li>
              <li><a href="#" className="hover:text-white transition">Theo dõi đơn hàng</a></li>
            </ul>
          </div>

          {/* Column 3: Danh mục nổi bật */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Danh mục</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition">Thời trang Nam</a></li>
              <li><a href="#" className="hover:text-white transition">Thời trang Nữ</a></li>
              <li><a href="#" className="hover:text-white transition">Phụ kiện</a></li>
              <li><a href="#" className="hover:text-white transition">Giày dép</a></li>
              <li><a href="#" className="hover:text-white transition">Đồ điện tử</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Đăng ký nhận tin</h3>
            <p className="text-sm mb-4">Nhận ngay mã giảm giá 10% cho đơn hàng đầu tiên của bạn.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Nhập email của bạn" 
                className="w-full px-4 py-2 rounded-l-md text-gray-900 focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition"
              >
                Gửi
              </button>
            </form>
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white text-xl">📘</a> {/* Thay bằng icon Facebook */}
              <a href="#" className="text-gray-400 hover:text-white text-xl">📸</a> {/* Thay bằng icon Instagram */}
              <a href="#" className="text-gray-400 hover:text-white text-xl">🐦</a> {/* Thay bằng icon Twitter */}
              <a href="#" className="text-gray-400 hover:text-white text-xl">▶️</a> {/* Thay bằng icon Youtube */}
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Bottom Section - Copyright & Payment */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ShopName. Tất cả các quyền được bảo lưu.
          </div>
          
          <div className="flex space-x-4 text-sm">
            <a href="#" className="hover:text-white transition">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-white transition">Chính sách bảo mật</a>
          </div>

          {/* Payment Methods */}
          <div className="flex space-x-2 mt-4 md:mt-0 text-2xl">
            <span>💳</span> {/* Có thể dùng thẻ img hoặc icon Visa/Mastercard/MoMo thực tế ở đây */}
            <span>💵</span>
            <span>🏦</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;