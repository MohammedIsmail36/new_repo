'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { theme } from '@/lib/theme';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', { username, password, redirect: true, callbackUrl: '/dashboard' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: theme.colors.gray_light }}>
      <Card style={{ ...theme.components.card, width: '400px' }}>
        <h1 style={theme.typography.heading_1}>تسجيل الدخول</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="اسم المستخدم" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" style={theme.components.button.primary}>دخول</Button>
        </form>
      </Card>
    </div>
  );
}