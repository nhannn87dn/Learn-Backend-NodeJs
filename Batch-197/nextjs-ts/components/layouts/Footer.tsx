
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-6">
        {/* Bố cục 4 cột */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Cột 1: Giới thiệu thương hiệu & Mạng xã hội */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">MyShop</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Chuyên cung cấp các sản phẩm chất lượng cao với mức giá tốt nhất. Trải nghiệm mua sắm hiện đại và đáng tin cậy.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition duration-200">
                <span>FB</span>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition duration-200">
                <span>IG</span>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition duration-200">
                <span>YT</span>
              </a>
            </div>
          </div>

          {/* Cột 2: Danh mục mua sắm */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2 inline-block">
              Mua Sắm
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition duration-200">Sản phẩm mới</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition duration-200">Bán chạy nhất</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition duration-200">Thời trang Nam</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition duration-200">Thời trang Nữ</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition duration-200">Khuyến mãi & Deals</a></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2 inline-block">
              Hỗ Trợ Khách Hàng
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition duration-200">Hướng dẫn mua hàng</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition duration-200">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition duration-200">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition duration-200">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition duration-200">Hệ thống cửa hàng</a></li>
            </ul>
          </div>

          {/* Cột 4: Đăng ký nhận bản tin */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2 inline-block">
              Đăng Ký Nhận Tin
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Nhận ngay voucher ưu đãi 10% cho đơn hàng đầu tiên của bạn!
            </p>
            <form  className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="w-full px-4 py-2.5 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-indigo-500 text-sm"
              />
              <button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2.5 rounded-lg transition duration-200 text-sm"
              >
                Đăng ký ngay
              </button>
            </form>
          </div>

        </div>

        {/* Dòng bản quyền & Phương thức thanh toán (Bottom bar) */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 MyShop. Tất cả các quyền được bảo lưu.</p>
          
          {/* Payment Badges */}
          <div className="flex items-center space-x-3">
            <span className="bg-gray-800 px-3 py-1.5 rounded text-gray-300 border border-gray-700">Visa</span>
            <span className="bg-gray-800 px-3 py-1.5 rounded text-gray-300 border border-gray-700">Mastercard</span>
            <span className="bg-gray-800 px-3 py-1.5 rounded text-gray-300 border border-gray-700">Momo</span>
            <span className="bg-gray-800 px-3 py-1.5 rounded text-gray-300 border border-gray-700">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;