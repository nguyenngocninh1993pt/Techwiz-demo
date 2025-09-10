import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

const pathToLabel: Record<string, string> = {
  '/': 'Trang chủ',
  '/careers': 'Ngân hàng nghề nghiệp',
  '/personality-test': 'Bài kiểm tra sở thích',
  '/multimedia': 'Hướng dẫn đa phương tiện',
  '/success-stories': 'Câu chuyện thành công',
  '/resources': 'Thư viện tài nguyên',
  '/feedback': 'Nhận xét',
  '/admissions': 'Tuyển sinh & Đào tạo',
  '/bookmarks': 'Nội dung đã lưu',
  '/contact': 'Liên hệ',
  '/about': 'Giới thiệu',
};

const Breadcrumb = () => {
  const location = useLocation();
  
  // Don't show breadcrumb on homepage
  if (location.pathname === '/') {
    return null;
  }

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Trang chủ', path: '/' }
  ];

  // Build breadcrumb items from path segments
  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = pathToLabel[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbItems.push({ label, path: currentPath });
  });

  return (
    <div className="container py-4">
      <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          return (
            <React.Fragment key={item.path || index}>
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              
              {isLast ? (
                <span className="font-medium text-foreground">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path || '/'}
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors",
                    index === 0 && "flex items-center space-x-1"
                  )}
                >
                  {index === 0 && <Home className="h-4 w-4" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumb;