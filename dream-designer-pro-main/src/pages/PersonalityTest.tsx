import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, ArrowRight, ArrowLeft, CheckCircle, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  category: 'analytical' | 'creative' | 'social' | 'practical';
}

const questions: Question[] = [
  {
    id: 1,
    question: "Bạn thích làm việc theo cách nào?",
    options: ["Phân tích dữ liệu và số liệu", "Sáng tạo và thiết kế", "Làm việc với mọi người", "Giải quyết vấn đề thực tế"],
    category: 'analytical'
  },
  {
    id: 2,
    question: "Trong thời gian rảnh, bạn thường làm gì?",
    options: ["Đọc sách và nghiên cứu", "Vẽ, viết hoặc sáng tác", "Gặp gỡ bạn bè", "Sửa chữa hoặc xây dựng thứ gì đó"],
    category: 'creative'
  },
  {
    id: 3,
    question: "Khi gặp khó khăn, bạn thường?",
    options: ["Tìm hiểu nguyên nhân sâu xa", "Nghĩ ra giải pháp sáng tạo", "Hỏi ý kiến người khác", "Thử nghiệm các cách khác nhau"],
    category: 'social'
  },
  {
    id: 4,
    question: "Môi trường làm việc lý tưởng của bạn là?",
    options: ["Văn phòng yên tĩnh", "Studio sáng tạo", "Không gian mở với nhiều người", "Phòng lab hoặc workshop"],
    category: 'practical'
  },
  {
    id: 5,
    question: "Bạn cảm thấy thành công khi?",
    options: ["Giải quyết được bài toán phức tạp", "Tạo ra sản phẩm độc đáo", "Giúp đỡ được người khác", "Hoàn thành dự án cụ thể"],
    category: 'analytical'
  }
];

const PersonalityTest = () => {
  const [selectedInterest, setSelectedInterest] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const { toast } = useToast();

  const interests = [
    "Công nghệ thông tin",
    "Y học và chăm sóc sức khỏe", 
    "Kinh doanh và quản lý",
    "Giáo dục và đào tạo",
    "Nghệ thuật và thiết kế",
    "Kỹ thuật và xây dựng",
    "Khoa học và nghiên cứu",
    "Truyền thông và marketing"
  ];

  const handleAnswerSelect = (value: string) => {
    const answerIndex = parseInt(value);
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answerIndex
    }));
  };

  const handleNext = () => {
    if (answers[questions[currentQuestion].id] === undefined) {
      toast({
        title: "Vui lòng chọn câu trả lời",
        description: "Hãy chọn một trong các phương án trước khi tiếp tục.",
        variant: "destructive"
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    const scores = {
      analytical: 0,
      creative: 0,
      social: 0,
      practical: 0
    };

    questions.forEach(question => {
      const answerIndex = answers[question.id];
      if (answerIndex !== undefined) {
        const categories = ['analytical', 'creative', 'social', 'practical'];
        const selectedCategory = categories[answerIndex] as keyof typeof scores;
        scores[selectedCategory]++;
      }
    });

    const maxScore = Math.max(...Object.values(scores));
    const primaryType = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0];

    return { scores, primaryType };
  };

  const getCareerSuggestions = (type: string) => {
    const suggestions = {
      analytical: [
        "Kỹ sư phần mềm",
        "Nhà phân tích dữ liệu", 
        "Kế toán",
        "Nhà nghiên cứu"
      ],
      creative: [
        "Nhà thiết kế UX/UI",
        "Kiến trúc sư",
        "Nhà văn/Biên tập viên",
        "Marketing Creative"
      ],
      social: [
        "Giáo viên",
        "Nhân viên nhân sự",
        "Tư vấn viên",
        "Bác sĩ"
      ],
      practical: [
        "Kỹ sư cơ khí",
        "Quản lý dự án",
        "Đầu bếp",
        "Kỹ thuật viên"
      ]
    };

    return suggestions[type as keyof typeof suggestions] || [];
  };

  const getTypeDescription = (type: string) => {
    const descriptions = {
      analytical: "Bạn có tư duy logic, thích phân tích và giải quyết vấn đề một cách có hệ thống.",
      creative: "Bạn có óc sáng tạo, thích nghĩ ra những ý tưởng mới và thể hiện bản thân.",
      social: "Bạn thích làm việc với con người, có khả năng giao tiếp và hỗ trợ người khác tốt.",
      practical: "Bạn thích làm việc với tay, giải quyết vấn đề thực tế và tạo ra sản phẩm cụ thể."
    };

    return descriptions[type as keyof typeof descriptions] || "";
  };

  if (showResults) {
    const { scores, primaryType } = calculateResults();
    const suggestions = getCareerSuggestions(primaryType || '');
    const description = getTypeDescription(primaryType || '');

    return (
      <div className="container py-8">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Kết quả kiểm tra tính cách</h1>
            <p className="text-muted-foreground">Dựa trên sở thích: {selectedInterest}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Personality Type */}
            <Card className="card-interactive">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Kiểu tính cách của bạn</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-primary-light rounded-lg">
                    <h3 className="text-xl font-bold text-primary capitalize mb-2">
                      {primaryType === 'analytical' && 'Tư duy phân tích'}
                      {primaryType === 'creative' && 'Sáng tạo'}
                      {primaryType === 'social' && 'Hướng xã hội'}
                      {primaryType === 'practical' && 'Thực tế'}
                    </h3>
                    <p className="text-sm">{description}</p>
                  </div>

                  <div className="space-y-2">
                    {Object.entries(scores).map(([type, score]) => (
                      <div key={type} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">
                            {type === 'analytical' && 'Phân tích'}
                            {type === 'creative' && 'Sáng tạo'}
                            {type === 'social' && 'Xã hội'}
                            {type === 'practical' && 'Thực tế'}
                          </span>
                          <span>{score}/{questions.length}</span>
                        </div>
                        <Progress value={(score / questions.length) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Suggestions */}
            <Card className="card-interactive">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5" />
                  <span>Nghề nghiệp phù hợp</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suggestions.map((career, index) => (
                    <div key={index} className="p-3 bg-gradient-subtle rounded-lg border border-border/50">
                      <h4 className="font-medium">{career}</h4>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2">
                  <Button className="w-full" onClick={() => window.location.href = '/careers'}>
                    Khám phá chi tiết nghề nghiệp
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => {
                    setShowResults(false);
                    setTestStarted(false);
                    setCurrentQuestion(0);
                    setAnswers({});
                    setSelectedInterest('');
                  }}>
                    Làm lại bài kiểm tra
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Bài kiểm tra sở thích nghề nghiệp</h1>
            <p className="text-muted-foreground">
              Khám phá tính cách và tìm ra những nghề nghiệp phù hợp với bạn
            </p>
          </div>

          <Card className="card-interactive">
            <CardHeader>
              <CardTitle>Chọn lĩnh vực bạn quan tâm</CardTitle>
              <CardDescription>
                Điều này sẽ giúp chúng tôi cá nhân hóa kết quả cho bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Select value={selectedInterest} onValueChange={setSelectedInterest}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn lĩnh vực quan tâm" />
                </SelectTrigger>
                <SelectContent>
                  {interests.map((interest) => (
                    <SelectItem key={interest} value={interest}>
                      {interest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Bài kiểm tra bao gồm:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• {questions.length} câu hỏi về tính cách và sở thích</li>
                  <li>• Thời gian hoàn thành: 5-10 phút</li>
                  <li>• Kết quả cá nhân hóa với đề xuất nghề nghiệp</li>
                </ul>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={() => setTestStarted(true)}
                disabled={!selectedInterest}
              >
                Bắt đầu kiểm tra
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto animate-slide-up">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Câu hỏi {currentQuestion + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card className="card-interactive">
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={answers[currentQ.id]?.toString() || ''}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>

              <Button onClick={handleNext}>
                {currentQuestion === questions.length - 1 ? 'Xem kết quả' : 'Tiếp theo'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalityTest;