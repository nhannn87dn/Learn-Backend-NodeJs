
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Về chúng tôi</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:text-white">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-white">Liên hệ</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Hỗ trợ</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Hướng dẫn sử dụng</a></li>
              <li><a href="#" className="hover:text-white">Chính sách bảo mật</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Dịch vụ</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:text-white">Khóa học</a></li>
              <li><a href="#" className="hover:text-white">Tài liệu</a></li>
              <li><a href="#" className="hover:text-white">Hỗ trợ kỹ thuật</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Kết nối</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:text-white">Facebook</a></li>
              <li><a href="#" className="hover:text-white">Zalo</a></li>
              <li><a href="#" className="hover:text-white">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-xs">&copy; {new Date().getFullYear()} Learn Backend NodeJs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer