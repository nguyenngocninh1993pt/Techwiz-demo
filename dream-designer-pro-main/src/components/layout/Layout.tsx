import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Breadcrumb from './Breadcrumb';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <Navigation />
      <Breadcrumb />
      <main className="pb-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-background/80 backdrop-blur">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Cổng Hướng nghiệp</h3>
              <p className="text-sm text-muted-foreground">
                Hỗ trợ bạn định hướng và phát triển sự nghiệp một cách hiệu quả.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Liên kết nhanh</h3>
              <div className="space-y-2 text-sm">
                <a href="/careers" className="block text-muted-foreground hover:text-foreground">
                  Ngân hàng nghề nghiệp
                </a>
                <a href="/personality-test" className="block text-muted-foreground hover:text-foreground">
                  Bài kiểm tra sở thích
                </a>
                <a href="/resources" className="block text-muted-foreground hover:text-foreground">
                  Thư viện tài nguyên
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Liên hệ</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Email: info@huongnghe.vn</p>
                <p>Điện thoại: (028) 1234 5678</p>
                <p>Địa chỉ: Tp. Hồ Chí Minh</p>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Cổng Hướng nghiệp. Được phát triển bởi Aptech.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;