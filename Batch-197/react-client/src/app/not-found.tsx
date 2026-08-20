import { Link, useNavigate } from 'react-router';
import { Home, ArrowLeft, FileQuestion } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex w-full max-w-md flex-col items-center space-y-6">
        
        {/* Biểu tượng báo lỗi minh họa */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
        </div>

        {/* Nội dung thông báo chính */}
        <div className="space-y-3">
          <h1 className="text-6xl font-extrabold tracking-tight text-primary lg:text-7xl">
            404
          </h1>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Không tìm thấy trang
          </h2>
          <p className="text-muted-foreground">
            Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không thể truy cập. Hãy kiểm tra lại đường dẫn nhé.
          </p>
        </div>

        {/* Cụm nút điều hướng (Call to Action) */}
        <div className="flex flex-col w-full gap-3 pt-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate(-1)}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }), 
              'flex w-full items-center gap-2 sm:w-auto'
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại trang trước
          </button>
          
          <Link
            to="/"
            className={cn(
              buttonVariants({ variant: 'default', size: 'lg' }), 
              'flex w-full items-center gap-2 sm:w-auto'
            )}
          >
            <Home className="h-4 w-4" />
            Về trang chủ
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default NotFoundPage;