import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Clock, MapPin, Users } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const Header = () => {
  const { userName, userType } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState('Đang tải...');
  const [visitorCount, setVisitorCount] = useState(1247);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`);
        },
        () => {
          setLocation('Việt Nam');
        }
      );
    }

    // Simulate visitor count increment
    const countTimer = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(countTimer);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Cổng Hướng nghiệp
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Định hướng tương lai của bạn
              </p>
            </div>
          </div>
        </div>

        {/* User Info and Stats */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Real-time Clock */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{currentTime.toLocaleTimeString('vi-VN')}</span>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>

          {/* Visitor Count */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{visitorCount.toLocaleString()} khách</span>
          </div>

          {/* User Greeting */}
          {userName && (
            <div className="px-3 py-1 bg-primary-light rounded-full">
              <span className="text-sm font-medium text-primary">
                Xin chào, {userName}!
              </span>
            </div>
          )}

          {/* Mock Auth Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Đăng nhập
            </Button>
            <Button size="sm" className="gradient-primary">
              Đăng ký
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <div className="container py-4 space-y-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{currentTime.toLocaleTimeString('vi-VN')}</span>
              <span>{visitorCount.toLocaleString()} khách</span>
            </div>
            
            {userName && (
              <div className="px-3 py-2 bg-primary-light rounded-lg">
                <span className="text-sm font-medium text-primary">
                  Xin chào, {userName}!
                </span>
              </div>
            )}

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                Đăng nhập
              </Button>
              <Button size="sm" className="flex-1 gradient-primary">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;