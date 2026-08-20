import { Link, NavLink } from 'react-router';
import { Mountain } from 'lucide-react'; // Icon giả lập cho Logo
import { cn } from '@/lib/utils'; // Utility function quen thuộc của shadcn
import { buttonVariants } from '@/components/ui/button';

// Tách config ra ngoài để dễ quản lý và mở rộng
const NAV_LINKS = [
  { name: 'Trang chủ', path: '/' },
  { name: 'Sản phẩm', path: '/products' },
  { name: 'Về chúng tôi', path: '/about' },
  { name: 'Liên hệ', path: '/contact' },
];

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* PHẦN TRÁI: Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Mountain className="h-6 w-6 text-primary" />
          <span className="hidden font-bold tracking-tight sm:inline-block text-lg">
            MyBrand
          </span>
        </Link>

        {/* PHẦN PHẢI: Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  // Tận dụng buttonVariants của shadcn dạng 'ghost' để có hiệu ứng hover chuẩn
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'text-muted-foreground transition-colors hover:text-primary',
                  // Đổi màu nếu link đang active
                  isActive && 'bg-accent text-accent-foreground font-medium'
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          {/* Có thể thêm các nút Call to Action hoặc Theme Toggle ở đây */}
          {/* <Button size="sm" className="ml-4">Đăng nhập</Button> */}
        </nav>
      </div>
    </header>
  );
};