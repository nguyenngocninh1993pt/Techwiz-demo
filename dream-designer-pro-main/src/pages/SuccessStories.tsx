import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, ArrowRight, Filter, Heart, Star, TrendingUp } from 'lucide-react';
import successStoriesData from '@/data/success-stories.json';

interface Story {
  id: number;
  name: string;
  title: string;
  field: string;
  image: string;
  story: string;
  achievement: string;
  journey: string;
}

const SuccessStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [selectedField, setSelectedField] = useState<string>('all');

  useEffect(() => {
    setStories(successStoriesData.stories);
    setFilteredStories(successStoriesData.stories);
  }, []);

  useEffect(() => {
    let filtered = stories.filter(story => {
      return selectedField === 'all' || story.field === selectedField;
    });

    setFilteredStories(filtered);
  }, [stories, selectedField]);

  const fields = [
    { value: 'all', label: 'Tất cả lĩnh vực' },
    { value: 'technology', label: 'Công nghệ' },
    { value: 'healthcare', label: 'Y tế' },
    { value: 'business', label: 'Kinh doanh' },
    { value: 'education', label: 'Giáo dục' }
  ];

  const getFieldIcon = (field: string) => {
    switch (field) {
      case 'technology': return '💻';
      case 'healthcare': return '🏥';
      case 'business': return '💼';
      case 'education': return '🎓';
      default: return '🌟';
    }
  };

  const getFieldColor = (field: string) => {
    switch (field) {
      case 'technology': return 'bg-blue-100 text-blue-700';
      case 'healthcare': return 'bg-red-100 text-red-700';
      case 'business': return 'bg-green-100 text-green-700';
      case 'education': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Câu chuyện Thành công
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Khám phá hành trình truyền cảm hứng của những người đã thành công trong sự nghiệp
        </p>
      </div>

      {/* Filter */}
      <div className="mb-8 animate-slide-up">
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2 w-full sm:w-auto">
              <label className="text-sm font-medium">Lọc theo lĩnh vực</label>
              <Select value={selectedField} onValueChange={setSelectedField}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fields.map((field) => (
                    <SelectItem key={field.value} value={field.value}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">
              {filteredStories.length} câu chuyện
            </div>
          </div>
        </Card>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-scale-in">
        {filteredStories.map((story) => (
          <Card key={story.id} className="card-interactive overflow-hidden">
            <CardHeader>
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xl font-bold">
                    {story.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-2 -right-2 text-2xl">
                    {getFieldIcon(story.field)}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{story.name}</CardTitle>
                    <Badge className={`text-xs ${getFieldColor(story.field)}`}>
                      {story.field === 'technology' && 'Công nghệ'}
                      {story.field === 'healthcare' && 'Y tế'}
                      {story.field === 'business' && 'Kinh doanh'}
                      {story.field === 'education' && 'Giáo dục'}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm font-medium text-primary mb-1">
                    {story.achievement}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground">
                    {story.title}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Story */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  {story.story}
                </p>
              </div>

              {/* Journey */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-success" />
                  Hành trình phát triển
                </h4>
                <div className="bg-success-light/50 p-3 rounded-lg">
                  <p className="text-sm text-success-foreground">
                    {story.journey}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full group">
                  Đọc câu chuyện đầy đủ
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredStories.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Không tìm thấy câu chuyện</h3>
          <p className="text-muted-foreground mb-4">
            Thử thay đổi bộ lọc để xem thêm câu chuyện khác
          </p>
          <Button 
            variant="outline" 
            onClick={() => setSelectedField('all')}
          >
            Xem tất cả câu chuyện
          </Button>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16">
        <Card className="max-w-4xl mx-auto p-8 gradient-card text-center">
          <Star className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Có câu chuyện của riêng bạn?</h3>
          <p className="text-muted-foreground mb-6">
            Chia sẻ hành trình thành công của bạn để truyền cảm hứng cho những người khác
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary">
              <Heart className="h-4 w-4 mr-2" />
              Chia sẻ câu chuyện
            </Button>
            <Button size="lg" variant="outline">
              Tìm hiểu thêm
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SuccessStories;