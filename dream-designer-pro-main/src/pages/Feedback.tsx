import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MessageCircle, Star, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    rating: '',
    message: '',
    suggestions: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Tên, email và nội dung phản hồi là bắt buộc",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Cảm ơn phản hồi của bạn!",
        description: "Chúng tôi sẽ xem xét và phản hồi trong thời gian sớm nhất",
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const categories = [
    { value: 'general', label: 'Phản hồi chung' },
    { value: 'feature', label: 'Đề xuất tính năng' },
    { value: 'bug', label: 'Báo lỗi' },
    { value: 'content', label: 'Nội dung' },
    { value: 'ui', label: 'Giao diện' }
  ];

  if (isSubmitted) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <CheckCircle className="h-24 w-24 text-success mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Cảm ơn bạn!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Phản hồi của bạn đã được gửi thành công. Chúng tôi sẽ xem xét và cải thiện dịch vụ dựa trên ý kiến của bạn.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Thời gian phản hồi</h3>
              <p className="text-sm text-muted-foreground">
                Chúng tôi thường phản hồi trong vòng 24-48 giờ làm việc
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Theo dõi</h3>
              <p className="text-sm text-muted-foreground">
                Kiểm tra email để nhận thông báo về phản hồi từ chúng tôi
              </p>
            </Card>
          </div>

          <div className="mt-8">
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  category: '',
                  rating: '',
                  message: '',
                  suggestions: ''
                });
              }}
              variant="outline"
            >
              Gửi phản hồi khác
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <MessageCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Phản hồi của bạn
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ý kiến của bạn rất quan trọng để chúng tôi cải thiện dịch vụ và mang lại trải nghiệm tốt hơn
        </p>
      </div>

      {/* Feedback Form */}
      <div className="max-w-4xl mx-auto animate-slide-up">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Basic Info */}
            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
                <CardDescription>
                  Vui lòng điền thông tin để chúng tôi có thể liên hệ lại với bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nhập họ và tên của bạn"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Loại phản hồi</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại phản hồi" />
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

                {/* Rating */}
                <div className="space-y-3">
                  <Label>Đánh giá tổng thể</Label>
                  <RadioGroup
                    value={formData.rating}
                    onValueChange={(value) => handleInputChange('rating', value)}
                    className="flex space-x-4"
                  >
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                        <Label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                          {[...Array(rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                          ))}
                          <span className="ml-1 text-sm">{rating}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Feedback Content */}
            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>Nội dung phản hồi</CardTitle>
                <CardDescription>
                  Chia sẻ chi tiết về trải nghiệm và ý kiến của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="message">Nội dung phản hồi *</Label>
                  <Textarea
                    id="message"
                    placeholder="Chia sẻ ý kiến, trải nghiệm hoặc vấn đề bạn gặp phải..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="suggestions">Đề xuất cải thiện</Label>
                  <Textarea
                    id="suggestions"
                    placeholder="Bạn có đề xuất gì để chúng tôi cải thiện dịch vụ tốt hơn?"
                    rows={4}
                    value={formData.suggestions}
                    onChange={(e) => handleInputChange('suggestions', e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full gradient-primary" size="lg">
                  <Send className="h-4 w-4 mr-2" />
                  Gửi phản hồi
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Phản hồi nhanh</h3>
            <p className="text-sm text-muted-foreground">
              Chúng tôi cam kết phản hồi trong 24h
            </p>
          </Card>

          <Card className="text-center p-6">
            <Star className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Cải thiện liên tục</h3>
            <p className="text-sm text-muted-foreground">
              Mọi ý kiến đều được ghi nhận và xem xét
            </p>
          </Card>

          <Card className="text-center p-6">
            <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Bảo mật thông tin</h3>
            <p className="text-sm text-muted-foreground">
              Thông tin của bạn được bảo vệ tuyệt đối
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Feedback;