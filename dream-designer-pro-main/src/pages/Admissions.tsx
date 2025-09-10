import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Globe, Briefcase, FileText, ArrowRight, CheckCircle } from 'lucide-react';

const Admissions = () => {
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);

  const majors = [
    {
      id: 1,
      name: "Công nghệ Thông tin",
      description: "Phát triển phần mềm, AI, và công nghệ số",
      careers: ["Kỹ sư phần mềm", "Data Scientist", "AI Engineer"],
      requirements: "Toán, Lý, Hóa hoặc Toán, Lý, Tin",
      duration: "4 năm",
      category: "technology"
    },
    {
      id: 2,
      name: "Kinh tế - Quản trị Kinh doanh",
      description: "Quản lý, marketing, và phân tích kinh doanh",
      careers: ["Quản lý dự án", "Marketing Manager", "Business Analyst"],
      requirements: "Toán, Văn, Anh",
      duration: "4 năm",
      category: "business"
    },
    {
      id: 3,
      name: "Y học",
      description: "Chăm sóc sức khỏe và điều trị bệnh nhân",
      careers: ["Bác sĩ", "Dược sĩ", "Y tá chuyên khoa"],
      requirements: "Sinh, Hóa, Lý",
      duration: "6 năm",
      category: "healthcare"
    },
    {
      id: 4,
      name: "Sư phạm",
      description: "Giáo dục và phát triển nhân tài tương lai",
      careers: ["Giáo viên", "Quản lý giáo dục", "Tư vấn học đường"],
      requirements: "Tùy theo chuyên ngành",
      duration: "4 năm",
      category: "education"
    }
  ];

  const studyAbroadPrograms = [
    {
      country: "Úc",
      programs: ["Bachelor of IT", "Master of Business"],
      duration: "2-4 năm",
      cost: "500,000 - 1,000,000 VNĐ/năm",
      requirements: "IELTS 6.0+, Tốt nghiệp THPT"
    },
    {
      country: "Singapore",
      programs: ["Engineering", "Business Administration"],
      duration: "3-4 năm", 
      cost: "800,000 - 1,500,000 VNĐ/năm",
      requirements: "IELTS 6.5+, Điểm tốt nghiệp từ 7.0"
    },
    {
      country: "Canada",
      programs: ["Computer Science", "Healthcare Management"],
      duration: "3-4 năm",
      cost: "600,000 - 1,200,000 VNĐ/năm",
      requirements: "IELTS 6.5+, Tốt nghiệp THPT với điểm cao"
    }
  ];

  const interviewTips = [
    {
      category: "Chuẩn bị trước phỏng vấn",
      tips: [
        "Tìm hiểu kỹ về công ty và vị trí apply",
        "Chuẩn bị câu trả lời cho các câu hỏi phổ biến",
        "Luyện tập trước gương hoặc với bạn bè",
        "Chuẩn bị trang phục chuyên nghiệp"
      ]
    },
    {
      category: "Trong buổi phỏng vấn",
      tips: [
        "Đến đúng giờ, tốt nhất là sớm 10-15 phút",
        "Giao tiếp bằng mắt và giữ thái độ tự tin",
        "Lắng nghe câu hỏi carefully trước khi trả lời",
        "Đặt câu hỏi thông minh về công việc và công ty"
      ]
    },
    {
      category: "Sau phỏng vấn",
      tips: [
        "Gửi email cảm ơn trong vòng 24 giờ",
        "Follow up nếu không có phản hồi sau 1 tuần",
        "Reflect về buổi phỏng vấn để cải thiện lần sau",
        "Tiếp tục apply các vị trí khác"
      ]
    }
  ];

  const cvTips = [
    {
      section: "Thông tin cá nhân",
      content: "Họ tên, số điện thoại, email, địa chỉ. Tránh thông tin không cần thiết như chiều cao, cân nặng."
    },
    {
      section: "Mục tiêu nghề nghiệp",
      content: "Viết ngắn gọn (2-3 dòng) về mục tiêu và giá trị bạn mang lại cho công ty."
    },
    {
      section: "Kinh nghiệm làm việc",
      content: "Liệt kê theo thứ tự thời gian ngược. Sử dụng động từ mạnh và số liệu cụ thể."
    },
    {
      section: "Học vấn",
      content: "Ghi rõ tên trường, ngành học, thời gian, GPA (nếu cao). Có thể thêm khóa học online."
    },
    {
      section: "Kỹ năng",
      content: "Chia thành kỹ năng mềm và cứng. Đánh giá mức độ thành thạo một cách chính xác."
    }
  ];

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <GraduationCap className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Phòng Tuyển sinh & Đào tạo
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Thông tin đầy đủ về các chương trình học, du học và kỹ năng cần thiết cho sự nghiệp
        </p>
      </div>

      {/* Main Content */}
      <div className="animate-slide-up">
        <Tabs defaultValue="majors" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="majors">Chọn chuyên ngành</TabsTrigger>
            <TabsTrigger value="abroad">Hướng dẫn du học</TabsTrigger>
            <TabsTrigger value="interview">Mẹo phỏng vấn</TabsTrigger>
            <TabsTrigger value="cv">Hướng dẫn viết CV</TabsTrigger>
          </TabsList>

          {/* Major Selection */}
          <TabsContent value="majors" className="mt-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Lựa chọn chuyên ngành sau lớp 10</h2>
              <p className="text-muted-foreground mb-6">
                Khám phá các ngành học phổ biến và định hướng nghề nghiệp tương lai
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {majors.map((major) => (
                <Card 
                  key={major.id} 
                  className={`card-interactive cursor-pointer ${selectedMajor === major.id.toString() ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedMajor(major.id.toString())}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{major.name}</CardTitle>
                        <CardDescription>{major.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{major.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Nghề nghiệp tiềm năng:</h4>
                        <div className="flex flex-wrap gap-2">
                          {major.careers.map((career, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {career}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">Tổ hợp môn:</h4>
                        <p className="text-sm text-muted-foreground">{major.requirements}</p>
                      </div>

                      <Button variant="outline" className="w-full">
                        Tìm hiểu chi tiết
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Study Abroad */}
          <TabsContent value="abroad" className="mt-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Hướng dẫn Du học</h2>
              <p className="text-muted-foreground mb-6">
                Thông tin về các chương trình du học phổ biến và quy trình apply
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {studyAbroadPrograms.map((program, index) => (
                <Card key={index} className="card-interactive">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl">{program.country}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Chương trình phổ biến:</h4>
                      <ul className="text-sm space-y-1">
                        {program.programs.map((prog, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-success mr-2" />
                            {prog}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div>
                        <span className="font-medium">Thời gian:</span>
                        <span className="ml-2 text-muted-foreground">{program.duration}</span>
                      </div>
                      <div>
                        <span className="font-medium">Chi phí:</span>
                        <span className="ml-2 text-muted-foreground">{program.cost}</span>
                      </div>
                      <div>
                        <span className="font-medium">Yêu cầu:</span>
                        <span className="ml-2 text-muted-foreground">{program.requirements}</span>
                      </div>
                    </div>

                    <Button className="w-full">Tư vấn chi tiết</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Interview Tips */}
          <TabsContent value="interview" className="mt-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Mẹo Phỏng vấn</h2>
              <p className="text-muted-foreground mb-6">
                Cách chuẩn bị và thể hiện tốt nhất trong buổi phỏng vấn xin việc
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {interviewTips.map((section, index) => (
                <Card key={index} className="card-interactive">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Briefcase className="h-5 w-5 mr-2 text-primary" />
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* CV Writing */}
          <TabsContent value="cv" className="mt-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Hướng dẫn viết CV</h2>
              <p className="text-muted-foreground mb-6">
                Tạo ra một bản CV ấn tượng và thu hút nhà tuyển dụng
              </p>
            </div>

            <div className="space-y-6">
              {cvTips.map((tip, index) => (
                <Card key={index} className="card-interactive">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      {tip.section}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tip.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Card className="max-w-2xl mx-auto p-8 gradient-card">
                <h3 className="text-xl font-bold mb-4">Template CV miễn phí</h3>
                <p className="text-muted-foreground mb-6">
                  Tải về template CV được thiết kế chuyên nghiệp, phù hợp với nhiều ngành nghề
                </p>
                <Button size="lg" className="gradient-primary">
                  Tải Template CV
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admissions;