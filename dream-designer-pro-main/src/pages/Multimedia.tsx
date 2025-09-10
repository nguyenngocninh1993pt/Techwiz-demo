import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Headphones, Clock, Filter, ExternalLink } from 'lucide-react';
import multimediaData from '@/data/multimedia.json';
import { useUser } from '@/context/UserContext';

interface MultimediaItem {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'podcast';
  url: string;
  duration: string;
  category: string;
  userType: string;
  thumbnail: string;
}

const Multimedia = () => {
  const [multimedia, setMultimedia] = useState<MultimediaItem[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<MultimediaItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedUserType, setSelectedUserType] = useState<string>('all');
  const { userType } = useUser();

  useEffect(() => {
    setMultimedia(multimediaData.multimedia as MultimediaItem[]);
    setFilteredMedia(multimediaData.multimedia as MultimediaItem[]);
  }, []);

  useEffect(() => {
    let filtered = multimedia.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesUserType = selectedUserType === 'all' || 
                             item.userType === 'all' || 
                             item.userType === selectedUserType;
      return matchesCategory && matchesUserType;
    });

    setFilteredMedia(filtered);
  }, [multimedia, selectedCategory, selectedUserType]);

  const categories = [
    { value: 'all', label: 'Tất cả danh mục' },
    { value: 'technology', label: 'Công nghệ' },
    { value: 'healthcare', label: 'Chăm sóc sức khỏe' },
    { value: 'business', label: 'Kinh doanh' },
    { value: 'general', label: 'Tổng quát' }
  ];

  const userTypes = [
    { value: 'all', label: 'Tất cả đối tượng' },
    { value: 'student', label: 'Học sinh' },
    { value: 'postgraduate', label: 'Sau đại học' },
    { value: 'professional', label: 'Chuyên gia' }
  ];

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Hướng dẫn Đa phương tiện
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Học hỏi từ các chuyên gia qua video và podcast chất lượng cao
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 animate-slide-up">
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Danh mục</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Đối tượng</label>
              <Select value={selectedUserType} onValueChange={setSelectedUserType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {userTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-muted-foreground">
                {filteredMedia.length} nội dung
              </div>
            </div>
          </div>

          {userType && (
            <div className="mt-4 p-3 bg-success-light rounded-lg">
              <p className="text-success text-sm">
                Hiển thị nội dung được đề xuất cho: {userType === 'student' ? 'Học sinh' : userType === 'postgraduate' ? 'Sau đại học' : 'Chuyên gia'}
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
        {filteredMedia.map((item) => (
          <Card key={item.id} className="card-interactive overflow-hidden">
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gradient-subtle">
              <div className="absolute inset-0 flex items-center justify-center">
                {item.type === 'video' ? (
                  <Play className="h-12 w-12 text-primary opacity-80" />
                ) : (
                  <Headphones className="h-12 w-12 text-primary opacity-80" />
                )}
              </div>
              
              {/* Type Badge */}
              <div className="absolute top-2 left-2">
                <Badge variant={item.type === 'video' ? 'default' : 'secondary'}>
                  {item.type === 'video' ? 'Video' : 'Podcast'}
                </Badge>
              </div>

              {/* Duration */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                <Clock className="h-3 w-3 inline mr-1" />
                {item.duration}
              </div>
            </div>

            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {item.category === 'technology' && 'Công nghệ'}
                  {item.category === 'healthcare' && 'Chăm sóc sức khỏe'}
                  {item.category === 'business' && 'Kinh doanh'}
                  {item.category === 'general' && 'Tổng quát'}
                </Badge>
                
                {item.userType !== 'all' && (
                  <Badge variant="secondary" className="text-xs">
                    {item.userType === 'student' && 'Học sinh'}
                    {item.userType === 'postgraduate' && 'Sinh viên'}
                    {item.userType === 'professional' && 'Chuyên gia'}
                  </Badge>
                )}
              </div>

              <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {item.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {item.type === 'video' && item.url.includes('youtube') ? (
                  <div className="space-y-2">
                    <Button className="w-full" onClick={() => window.open(item.url, '_blank')}>
                      <Play className="h-4 w-4 mr-2" />
                      Xem video
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Mở trong tab mới
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full" onClick={() => window.open(item.url, '_blank')}>
                    <Headphones className="h-4 w-4 mr-2" />
                    Nghe podcast
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <Play className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Không tìm thấy nội dung phù hợp</h3>
          <p className="text-muted-foreground mb-4">
            Thử thay đổi bộ lọc để xem thêm nội dung khác
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedCategory('all');
              setSelectedUserType('all');
            }}
          >
            Xóa bộ lọc
          </Button>
        </div>
      )}

      {/* Featured Content */}
      <div className="mt-16">
        <Card className="max-w-4xl mx-auto p-8 gradient-card text-center">
          <h3 className="text-2xl font-bold mb-4">Có gợi ý nội dung?</h3>
          <p className="text-muted-foreground mb-6">
            Chúng tôi luôn cập nhật những video và podcast mới nhất từ các chuyên gia hàng đầu
          </p>
          <Button size="lg" variant="outline">
            Đề xuất nội dung
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Multimedia;