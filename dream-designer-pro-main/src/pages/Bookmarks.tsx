import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bookmark } from 'lucide-react';

const Bookmarks = () => {
  return (
    <div className="container py-8">
      <div className="text-center mb-12 animate-fade-in">
        <Bookmark className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Nội dung đã lưu
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Quản lý các nghề nghiệp và tài nguyên bạn đã đánh dấu
        </p>
      </div>
      
      <Card className="text-center p-12">
        <CardHeader>
          <CardTitle>Chưa có nội dung đã lưu</CardTitle>
          <CardDescription>
            Bắt đầu khám phá và lưu các nghề nghiệp hoặc tài nguyên yêu thích của bạn
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Bookmarks;