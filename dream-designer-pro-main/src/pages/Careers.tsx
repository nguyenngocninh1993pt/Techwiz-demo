import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, DollarSign, GraduationCap, BookOpen, Briefcase, Heart, Bookmark, BookmarkCheck } from 'lucide-react';
import careersData from '@/data/careers.json';
import { useToast } from '@/hooks/use-toast';

interface Career {
  id: number;
  title: string;
  description: string;
  skills: string[];
  education: string;
  salary: string;
  category: string;
  image: string;
}

const Careers = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [bookmarkedCareers, setBookmarkedCareers] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    setCareers(careersData.careers);
    setFilteredCareers(careersData.careers);
  }, []);

  useEffect(() => {
    let filtered = careers.filter(career => {
      const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          career.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || career.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort careers
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'salary') {
      filtered.sort((a, b) => {
        const salaryA = parseInt(a.salary.replace(/\D/g, ''));
        const salaryB = parseInt(b.salary.replace(/\D/g, ''));
        return salaryB - salaryA;
      });
    }

    setFilteredCareers(filtered);
  }, [careers, searchTerm, selectedCategory, sortBy]);

  const handleBookmark = (careerId: number, careerTitle: string) => {
    const newBookmarked = new Set(bookmarkedCareers);
    if (newBookmarked.has(careerId)) {
      newBookmarked.delete(careerId);
      toast({
        title: "Đã bỏ lưu",
        description: `Đã bỏ lưu nghề "${careerTitle}"`,
      });
    } else {
      newBookmarked.add(careerId);
      toast({
        title: "Đã lưu",
        description: `Đã lưu nghề "${careerTitle}" vào danh sách yêu thích`,
      });
    }
    setBookmarkedCareers(newBookmarked);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technology': return <BookOpen className="h-4 w-4" />;
      case 'healthcare': return <Heart className="h-4 w-4" />;
      case 'business': return <Briefcase className="h-4 w-4" />;
      case 'education': return <GraduationCap className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'technology': 'Công nghệ',
      'healthcare': 'Chăm sóc sức khỏe',
      'business': 'Kinh doanh',
      'education': 'Giáo dục'
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Ngân hàng Nghề nghiệp
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Khám phá hàng trăm nghề nghiệp với thông tin chi tiết về kỹ năng, lương và lộ trình phát triển
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 animate-slide-up">
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm nghề nghiệp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Chọn ngành" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả ngành</SelectItem>
                {careersData.categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Tên A-Z</SelectItem>
                <SelectItem value="salary">Mức lương cao nhất</SelectItem>
              </SelectContent>
            </Select>

            {/* Results Count */}
            <div className="flex items-center justify-center md:justify-start">
              <span className="text-sm text-muted-foreground">
                {filteredCareers.length} nghề nghiệp
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Career Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
        {filteredCareers.map((career) => (
          <Card key={career.id} className="card-interactive group">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(career.category)}
                  <Badge variant="secondary" className="text-xs">
                    {getCategoryLabel(career.category)}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBookmark(career.id, career.title)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {bookmarkedCareers.has(career.id) ? (
                    <BookmarkCheck className="h-4 w-4 text-primary" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              <CardTitle className="text-xl mb-2">{career.title}</CardTitle>
              <CardDescription className="text-sm line-clamp-3">
                {career.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Salary */}
              <div className="flex items-center space-x-2 text-success">
                <DollarSign className="h-4 w-4" />
                <span className="font-semibold">{career.salary}</span>
              </div>

              {/* Education */}
              <div className="flex items-start space-x-2">
                <GraduationCap className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{career.education}</span>
              </div>

              {/* Skills */}
              <div>
                <p className="text-sm font-medium mb-2">Kỹ năng cần thiết:</p>
                <div className="flex flex-wrap gap-1">
                  {career.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {career.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{career.skills.length - 3} khác
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Button className="w-full" variant="outline">
                Xem chi tiết
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredCareers.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Không tìm thấy nghề nghiệp phù hợp</h3>
          <p className="text-muted-foreground mb-4">
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để có kết quả tốt hơn
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          >
            Xóa bộ lọc
          </Button>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <Card className="max-w-2xl mx-auto p-8 gradient-card">
          <h3 className="text-2xl font-bold mb-4">Chưa tìm được nghề phù hợp?</h3>
          <p className="text-muted-foreground mb-6">
            Thử làm bài kiểm tra tính cách để khám phá những nghề nghiệp phù hợp với bạn
          </p>
          <Button size="lg" className="gradient-primary">
            Làm bài kiểm tra ngay
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Careers;