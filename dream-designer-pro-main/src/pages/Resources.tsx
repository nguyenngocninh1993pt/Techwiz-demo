import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, FileText, Download, ExternalLink, Video, CheckCircle, Bookmark } from 'lucide-react';

const Resources = () => {
  const [bookmarkedResources, setBookmarkedResources] = useState<Set<number>>(new Set());

  const resources = {
    articles: [
      {
        id: 1,
        title: "10 Kỹ năng mềm quan trọng nhất trong thế kỷ 21",
        description: "Tổng hợp những kỹ năng cần thiết cho mọi nghề nghiệp hiện đại",
        type: "Bài viết",
        link: "#",
        author: "Chuyên gia HR"
      },
      {
        id: 2,
        title: "Cách viết CV ấn tượng và thu hút nhà tuyển dụng",
        description: "Hướng dẫn chi tiết từ A-Z để tạo ra bản CV hoàn hảo",
        type: "Bài viết",
        link: "#",
        author: "Tư vấn nghề nghiệp"
      },
      {
        id: 3,
        title: "Xu hướng việc làm 2024: Những ngành nghề hot nhất",
        description: "Phân tích thị trường lao động và dự báo xu hướng tương lai",
        type: "Bài viết",
        link: "#",
        author: "Nghiên cứu thị trường"
      }
    ],
    ebooks: [
      {
        id: 4,
        title: "Sách điện tử: Nghệ thuật phỏng vấn xin việc",
        description: "120 trang hướng dẫn chi tiết cách vượt qua mọi vòng phỏng vấn",
        type: "E-book",
        link: "#",
        pages: "120 trang"
      },
      {
        id: 5,
        title: "Định hướng nghề nghiệp cho người trẻ",
        description: "Cẩm nang đầy đủ về cách chọn nghề và phát triển sự nghiệp",
        type: "E-book", 
        link: "#",
        pages: "85 trang"
      }
    ],
    checklists: [
      {
        id: 6,
        title: "Checklist chuẩn bị phỏng vấn",
        description: "Danh sách kiểm tra đầy đủ trước mỗi buổi phỏng vấn",
        type: "Checklist",
        link: "#",
        items: "25 mục"
      },
      {
        id: 7,
        title: "Checklist chuyển việc thành công",
        description: "Các bước cần thực hiện khi muốn thay đổi công việc",
        type: "Checklist",
        link: "#",
        items: "18 mục"
      }
    ],
    webinars: [
      {
        id: 8,
        title: "Webinar: Khởi nghiệp thành công từ con số 0",
        description: "Chia sẻ kinh nghiệm thực tế từ các doanh nhân thành công",
        type: "Webinar",
        link: "#",
        duration: "90 phút"
      },
      {
        id: 9,
        title: "Webinar: Chuyển đổi số trong nghề nghiệp",
        description: "Cách thích ứng với công nghệ mới trong mọi lĩnh vực",
        type: "Webinar",
        link: "#",
        duration: "60 phút"
      }
    ]
  };

  const toggleBookmark = (id: number) => {
    const newBookmarked = new Set(bookmarkedResources);
    if (newBookmarked.has(id)) {
      newBookmarked.delete(id);
    } else {
      newBookmarked.add(id);
    }
    setBookmarkedResources(newBookmarked);
  };

  const ResourceCard = ({ resource, showExtra }: { resource: any, showExtra?: string }) => (
    <Card className="card-interactive">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline">{resource.type}</Badge>
              {showExtra && (
                <span className="text-xs text-muted-foreground">{showExtra}</span>
              )}
            </div>
            <CardTitle className="text-lg mb-2">{resource.title}</CardTitle>
            <CardDescription className="text-sm">
              {resource.description}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleBookmark(resource.id)}
            className="ml-2"
          >
            <Bookmark 
              className={`h-4 w-4 ${bookmarkedResources.has(resource.id) ? 'fill-current text-primary' : ''}`} 
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {resource.author || resource.pages || resource.items || resource.duration}
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-3 w-3 mr-1" />
              Xem
            </Button>
            <Button size="sm">
              <Download className="h-3 w-3 mr-1" />
              Tải về
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Thư viện Tài nguyên
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Bộ sưu tập đầy đủ các tài liệu, hướng dẫn và công cụ hỗ trợ phát triển sự nghiệp
        </p>
      </div>

      {/* Resource Categories */}
      <div className="animate-slide-up">
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="articles" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Bài viết</span>
            </TabsTrigger>
            <TabsTrigger value="ebooks" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Sách điện tử</span>
            </TabsTrigger>
            <TabsTrigger value="checklists" className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Checklist</span>
            </TabsTrigger>
            <TabsTrigger value="webinars" className="flex items-center space-x-2">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Webinar</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.articles.map((article) => (
                <ResourceCard key={article.id} resource={article} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ebooks" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.ebooks.map((ebook) => (
                <ResourceCard key={ebook.id} resource={ebook} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="checklists" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.checklists.map((checklist) => (
                <ResourceCard key={checklist.id} resource={checklist} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="webinars" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.webinars.map((webinar) => (
                <ResourceCard key={webinar.id} resource={webinar} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Featured Resources */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Tài nguyên nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="gradient-card p-6">
            <h3 className="text-xl font-bold mb-4">Bộ kit chuẩn bị phỏng vấn</h3>
            <p className="text-muted-foreground mb-6">
              Tất cả những gì bạn cần để chuẩn bị cho buổi phỏng vấn hoàn hảo
            </p>
            <Button className="gradient-primary">
              Tải miễn phí
              <Download className="h-4 w-4 ml-2" />
            </Button>
          </Card>

          <Card className="gradient-card p-6">
            <h3 className="text-xl font-bold mb-4">Khóa học online miễn phí</h3>
            <p className="text-muted-foreground mb-6">
              Series video hướng dẫn phát triển kỹ năng nghề nghiệp từ cơ bản đến nâng cao
            </p>
            <Button variant="outline">
              Đăng ký ngay
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Resources;