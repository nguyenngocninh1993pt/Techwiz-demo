import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container py-8">
      <div className="text-center mb-12 animate-fade-in">
        <Phone className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Liên hệ với chúng tôi
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn trong hành trình phát triển nghề nghiệp
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-interactive text-center p-6">
          <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
          <CardTitle className="mb-2">Điện thoại</CardTitle>
          <p className="text-muted-foreground">(028) 1234 5678</p>
        </Card>

        <Card className="card-interactive text-center p-6">
          <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
          <CardTitle className="mb-2">Email</CardTitle>
          <p className="text-muted-foreground">info@huongnghe.vn</p>
        </Card>

        <Card className="card-interactive text-center p-6">
          <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
          <CardTitle className="mb-2">Địa chỉ</CardTitle>
          <p className="text-muted-foreground">Tp. Hồ Chí Minh, Việt Nam</p>
        </Card>
      </div>
    </div>
  );
};

export default Contact;