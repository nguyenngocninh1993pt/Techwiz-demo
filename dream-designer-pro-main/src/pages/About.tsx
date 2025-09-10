import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

const About = () => {
  return (
    <div className="container py-8">
      <div className="text-center mb-12 animate-fade-in">
        <Info className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Giới thiệu về chúng tôi
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Cổng thông tin hướng nghiệp hàng đầu Việt Nam
        </p>
      </div>

      <Card className="card-interactive p-8">
        <CardHeader>
          <CardTitle>Sứ mệnh của chúng tôi</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Chúng tôi cam kết hỗ trợ người trẻ Việt Nam trong việc định hướng và phát triển sự nghiệp một cách hiệu quả và bền vững.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;