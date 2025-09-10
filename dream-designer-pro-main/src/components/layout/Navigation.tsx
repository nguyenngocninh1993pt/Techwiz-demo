import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useUser } from '@/context/UserContext';
import { 
  Home, 
  Briefcase, 
  Brain, 
  Play, 
  Trophy, 
  BookOpen, 
  MessageCircle, 
  GraduationCap,
  Bookmark,
  Phone,
  Info
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  userTypes?: string[];
}

const navigationItems: NavItem[] = [
  { path: '/', label: 'Trang chủ', icon: Home },
  { path: '/careers', label: 'Ngân hàng nghề nghiệp', icon: Briefcase },
  { path: '/personality-test', label: 'Bài kiểm tra sở thích', icon: Brain },
  { path: '/multimedia', label: 'Hướng dẫn đa phương tiện', icon: Play },
  { path: '/success-stories', label: 'Câu chuyện thành công', icon: Trophy },
  { path: '/resources', label: 'Thư viện tài nguyên', icon: BookOpen },
  { path: '/feedback', label: 'Nhận xét', icon: MessageCircle },
  { path: '/admissions', label: 'Tuyển sinh & Đào tạo', icon: GraduationCap },
  { path: '/bookmarks', label: 'Nội dung đã lưu', icon: Bookmark },
  { path: '/contact', label: 'Liên hệ', icon: Phone },
  { path: '/about', label: 'Giới thiệu', icon: Info },
];

const Navigation = () => {
  const location = useLocation();
  const { userType } = useUser();

  return (
    <nav className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1 overflow-x-auto py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  "hover:bg-primary-light hover:text-primary",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-soft" 
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Navigation Scroll */}
        <div className="lg:hidden flex items-center space-x-2 overflow-x-auto py-3 scrollbar-hide">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center space-y-1 p-2 rounded-lg text-xs font-medium transition-all duration-200 min-w-[80px]",
                  "hover:bg-primary-light hover:text-primary",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-soft" 
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-center leading-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* User Type Indicator */}
        {userType && (
          <div className="border-t py-2">
            <div className="flex items-center justify-center">
              <div className="px-4 py-1 bg-success-light text-success font-medium text-sm rounded-full">
                Đang xem cho: {userType === 'student' ? 'Học sinh' : userType === 'postgraduate' ? 'Sau đại học' : 'Chuyên gia'}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;