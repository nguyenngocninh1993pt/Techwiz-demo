import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser, UserType, getPersonalizedGreeting } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Trophy, Star, Target, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { userType, userName, setUserType, setUserName } = useUser();
  const [tempUserType, setTempUserType] = useState<UserType>(null);
  const [tempUserName, setTempUserName] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempUserType || !tempUserName.trim()) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Hãy nhập tên và chọn loại người dùng của bạn.",
        variant: "destructive"
      });
      return;
    }
    
    setUserType(tempUserType);
    setUserName(tempUserName.trim());
    
    toast({
      title: "Chào mừng!",
      description: `Xin chào ${tempUserName}! Hệ thống đã được cá nhân hóa cho bạn.`,
    });
  };

  const userTypeOptions = [
    {
      value: 'student' as UserType,
      label: 'Học sinh (Lớp 8-12)',
      description: 'Dành cho học sinh THCS và THPT đang tìm hiểu về định hướng nghề nghiệp',
      icon: BookOpen,
      color: 'text-blue-500'
    },
    {
      value: 'postgraduate' as UserType,
      label: 'Sau đại học',
      description: 'Dành cho sinh viên đại học và học viên sau đại học',
      icon: Users,
      color: 'text-green-500'
    },
    {
      value: 'professional' as UserType,
      label: 'Chuyên gia đang làm việc',
      description: 'Dành cho người đi làm muốn thay đổi hoặc phát triển nghề nghiệp',
      icon: Trophy,
      color: 'text-purple-500'
    }
  ];

  const features = [
    {
      icon: Target,
      title: 'Định hướng cá nhân',
      description: 'Tư vấn nghề nghiệp phù hợp với sở thích và năng lực'
    },
    {
      icon: Lightbulb,
      title: 'Bài kiểm tra tính cách',
      description: 'Khám phá bản thân qua các bài test chuyên nghiệp'
    },
    {
      icon: Star,
      title: 'Câu chuyện thành công',
      description: 'Học hỏi từ hành trình của những người đi trước'
    }
  ];

  if (userType && userName) {
    return (
      <div className="container py-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-success-light text-success rounded-full mb-6">
            <Star className="h-4 w-4 mr-2" />
            {getPersonalizedGreeting(userType)}
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Xin chào, <span className="bg-gradient-primary bg-clip-text text-transparent">{userName}</span>!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hệ thống đã được cá nhân hóa dành riêng cho bạn. Khám phá các tài nguyên và công cụ phù hợp với hành trình của bạn.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="card-interactive cursor-pointer" onClick={() => navigate('/careers')}>
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Khám phá nghề nghiệp</CardTitle>
              <CardDescription>
                Tìm hiểu về các ngành nghề phù hợp với bạn
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-interactive cursor-pointer" onClick={() => navigate('/personality-test')}>
            <CardHeader>
              <Target className="h-8 w-8 text-success mb-2" />
              <CardTitle>Kiểm tra sở thích</CardTitle>
              <CardDescription>
                Khám phá tính cách và sở thích nghề nghiệp của bạn
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-interactive cursor-pointer" onClick={() => navigate('/multimedia')}>
            <CardHeader>
              <Lightbulb className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle>Hướng dẫn video</CardTitle>
              <CardDescription>
                Học hỏi từ các chuyên gia qua video và podcast
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Dynamic Menu Based on User Type */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Tài nguyên dành cho bạn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userType === 'student' && (
              <>
                <Card className="card-interactive">
                  <CardHeader>
                    <CardTitle>Hướng dẫn chọn ngành</CardTitle>
                    <CardDescription>
                      Tìm hiểu các ngành học phù hợp sau THPT
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" onClick={() => navigate('/admissions')}>
                      Khám phá ngay
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="card-interactive">
                  <CardHeader>
                    <CardTitle>Kỹ năng cần phát triển</CardTitle>
                    <CardDescription>
                      Các kỹ năng quan trọng cho học sinh
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/resources')}>
                      Xem tài liệu
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {userType === 'postgraduate' && (
              <>
                <Card className="card-interactive">
                  <CardHeader>
                    <CardTitle>Chuẩn bị cho thị trường lao động</CardTitle>
                    <CardDescription>
                      Hướng dẫn viết CV và phỏng vấn
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" onClick={() => navigate('/admissions')}>
                      Bắt đầu ngay
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="card-interactive">
                  <CardHeader>
                    <CardTitle>Cơ hội thực tập</CardTitle>
                    <CardDescription>
                      Tìm kiếm cơ hội thực tập phù hợp
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/careers')}>
                      Tìm hiểu thêm
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {userType === 'professional' && (
              <>
                <Card className="card-interactive">
                  <CardHeader>
                    <CardTitle>Thay đổi nghề nghiệp</CardTitle>
                    <CardDescription>
                      Hướng dẫn chuyển đổi nghề nghiệp thành công
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" onClick={() => navigate('/success-stories')}>
                      Đọc câu chuyện
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="card-interactive">
                  <CardHeader>
                    <CardTitle>Phát triển kỹ năng</CardTitle>
                    <CardDescription>
                      Nâng cao kỹ năng chuyên môn và quản lý
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/multimedia')}>
                      Học ngay
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => {
              setUserType(null);
              setUserName('');
              setTempUserType(null);
              setTempUserName('');
            }}
          >
            Thay đổi thông tin cá nhân
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Cổng Thông Tin Hướng Nghiệp
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Định hướng tương lai, kiến tạo thành công
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-primary-light text-primary rounded-full mb-8">
            <Star className="h-5 w-5 mr-2" />
            Khám phá tiềm năng và xây dựng sự nghiệp của bạn
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-slide-up">
        {features.map((feature, index) => (
          <Card key={index} className="card-interactive text-center">
            <CardHeader>
              <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* User Selection Form */}
      <div className="max-w-2xl mx-auto animate-scale-in">
        <Card className="shadow-large">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Bắt đầu hành trình của bạn</CardTitle>
            <CardDescription>
              Để có trải nghiệm tốt nhất, vui lòng cho chúng tôi biết về bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name">Tên của bạn</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nhập tên của bạn"
                  value={tempUserName}
                  onChange={(e) => setTempUserName(e.target.value)}
                  className="text-lg"
                />
              </div>

              {/* User Type Selection */}
              <div className="space-y-4">
                <Label>Bạn thuộc nhóm nào?</Label>
                <RadioGroup
                  value={tempUserType || ''}
                  onValueChange={(value) => setTempUserType(value as UserType)}
                  className="space-y-4"
                >
                  {userTypeOptions.map((option) => (
                    <div key={option.value} className="flex items-start space-x-3">
                      <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                      <div className="flex-1 cursor-pointer" onClick={() => setTempUserType(option.value)}>
                        <div className="flex items-center space-x-2 mb-1">
                          <option.icon className={`h-5 w-5 ${option.color}`} />
                          <Label htmlFor={option.value} className="font-medium cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full gradient-primary text-lg py-6 hover-glow">
                Bắt đầu khám phá
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;